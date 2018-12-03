(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newPostHandler'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n<section class=\"post-container\">\n  <div class=\"post-time\">\n    "
    + alias4(((helper = (helper = helpers.times || (depth0 != null ? depth0.times : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"times","hash":{},"data":data}) : helper)))
    + "\n  </div>\n  <div class=\"post-contents\">\n    "
    + alias4(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"content","hash":{},"data":data}) : helper)))
    + "\n  </div>\n</section>\n";
},"useData":true});
})();