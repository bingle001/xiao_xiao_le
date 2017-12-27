var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActionManager = (function () {
    function ActionManager() {
    }
    ActionManager.create = function (handle_text, classFactory, attr) {
        var hashCode = handle_text.hashCode;
        var ret = true;
        if (!this.m_qActions[hashCode]) {
            this.m_qActions[hashCode] = new classFactory();
        }
        else if (this.m_qActions[hashCode] && this.m_qActions[hashCode].isLife) {
            this.m_qActions[hashCode].isLife = false;
            ret = false;
        }
        this.m_qAttrs[hashCode] = attr;
        return ret;
    };
    ActionManager.removeAction = function (handle) {
        var hashCode = handle.hashCode;
        if (this.m_qActions[hashCode]) {
            this.m_qActions[hashCode].onDestroy();
            this.m_qActions[hashCode] = null;
            this.m_qAttrs[hashCode] = null;
            delete this.m_qActions[hashCode];
            delete this.m_qAttrs[hashCode];
        }
    };
    ActionManager.removeActions = function () {
        var actions = this.m_qActions;
        for (var hasCode in actions) {
            this.removeAction(actions[hasCode]);
        }
        this.m_qActions = [];
        this.m_qAttrs = [];
    };
    ActionManager.m_qActions = [];
    ActionManager.m_qAttrs = [];
    return ActionManager;
}());
__reflect(ActionManager.prototype, "ActionManager");
//# sourceMappingURL=ActionManager.js.map