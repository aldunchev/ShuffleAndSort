var shuffleAndSortModule = (function () {

  var shuffleBtn = document.querySelector('#shuffleBtn'),
      sortBtn = document.querySelector('#sortBtn'),
      reverseBtn = document.querySelector('#reverseBtn'),
      itemList = document.querySelector('#itemList');

  // Convert nodeList object to array, so it can be processed.
  function nodeListToArray (nodeList) {
    nodeList = Array.prototype.slice.call(nodeList, 0);
    return nodeList;
  }

  function appendNewItems (items) {
    for(var i = 0; i < items.length; i++) {
      itemList.appendChild(items[i]);
      // Use class name instead of classList, because of IE.
      items[i].children[0].className += ' animate';
    }
  }

  function shuffle (event) {
    event.stopPropagation();
    var items = document.querySelectorAll('.item'),
        itemsLength = items.length;

    if ( itemsLength === 0 ) return false;

    items = nodeListToArray(items);

    // Use Fisher-Yates shuffling algorithm.
    while ( --itemsLength ) {
      var j = Math.floor( Math.random() * ( itemsLength + 1 ) );

      var tempi = items[itemsLength],
          tempj = items[j];
      items[itemsLength] = tempj;
      items[j] = tempi;
    }

    appendNewItems(items);
  } // End shuffle function.

  function sort (event) {
    var items = document.querySelectorAll('.item'),
        itemsLength = items.length;

    if ( itemsLength === 0 ) return false;

    items = nodeListToArray(items);

    items.sort(function(a, b) {
      // Use only the number from the id.
      var aord = +a.id.split('-')[1],
          bord = +b.id.split('-')[1];
      return aord - bord;
    });

    appendNewItems(items);
  } // End sort function.

  function reverse (event) {
    event.stopPropagation();
    var items = document.querySelectorAll('.item'),
        itemsLength = items.length;

    if ( itemsLength === 0 ) return false;

    items = nodeListToArray(items);
    items.reverse();

    appendNewItems(items);
  } // End reverse function.

  return {
    init: function() {
      shuffleBtn.addEventListener('click', shuffle, false);
      sortBtn.addEventListener('click', sort, false);
      reverseBtn.addEventListener('click', reverse, false);
    }
  };

})();

shuffleAndSortModule.init();
