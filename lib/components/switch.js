var BaseComponent  = require("./base"),
BindableCollection = require("bindable-collection"),
BindableObject     = require("bindable-object");

/**
 */

function SwitchComponent (options) {
  BaseComponent.call(this, options);

  var self = this;

  // TODO - this is a bit fugly
  this.childTemplates = this.childTemplate.vnode.children.map(function (vnode) {
    return self.childTemplate.child(vnode);
  });
}

/**
 */

module.exports = BaseComponent.extend(SwitchComponent, {

  /**
   */

  update: function () {

    var currentTpl, show = this.attributes.state;


    if (typeof show === "number") {
      currentTpl = this.childTemplates[show];
    } else {

      // match by name
      for (var i = this.childTemplates.length; i--;) {
        var childTemplate = this.childTemplates[i];
        if (childTemplate.vnode.attributes.name === show) {
          currentTpl = childTemplate;
          break;
        }
      }
    }

    if (this.currentTemplate === currentTpl) return;
    this.currentTemplate = currentTpl;
    if (this.currentView) this.currentView.dispose();
    if (!currentTpl) return;
    this.currentView = currentTpl.view(this.context);
    this.currentTemplate = currentTpl;
    this.section.appendChild(this.currentView.render());
  }
});