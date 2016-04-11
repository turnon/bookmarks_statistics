var root;

function getTreeAndRender(){
  chrome.bookmarks.getTree(function(node){
    root = node[0];
    setAncestors(root);
    render(compute(root));
  });
}

document.addEventListener('DOMContentLoaded', getTreeAndRender);

_.each(
  ['onCreated', 'onRemoved', 'onChanged', 'onMoved', 'onChildrenReordered', 'onImportEnded'],
  function(event){chrome.bookmarks[event].addListener(getTreeAndRender);}
);