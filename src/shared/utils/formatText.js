export const formatText = (text = '') => {
  var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  var translate = {"nbsp": " ","amp" : "&","quot": "\"","lt"  : "<","gt"  : ">"};
  return ( text.replace(translate_re, function(match, entity) {
    return translate[entity];
  }) );
};