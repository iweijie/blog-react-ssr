function Node(value) {
    if (value instanceof Node) return value;
    this.value = value;
    this.next = null;
    this.pre = null;
}
Node.prototype.setNext = function (next) {
    this.next = next;
}
Node.prototype.setPre = function (pre) {
    this.pre = pre;
}
function LinkedList() {
    this.firstNode = null;
    this.endtNode = null;
    this.length = 0;
}
LinkedList.prototype.unshift = function (value) {
    const node = new Node(value);
    if (!this.length) {
        this.firstNode = node
        this.endtNode = node
    } else {
        node.setNext(this.firstNode)
        node.setPre(null)
        this.firstNode.setPre(node)
        this.firstNode = node
    }
    this.length++;
    return node
}
// 依据 索引  删除元素
LinkedList.prototype.removeByIndex = function (index) {
    if (typeof index !== "number" || index < 0 || index >= this.length) return false;
    let node = this.findByIndex(index)
    return this.removeByNode(node)
}

// 依据 node  删除元素
LinkedList.prototype.removeByNode = function (node) {
    if (!(node instanceof Node)) return false;
    node.pre && node.pre.setNext(node.next)
    node.next && node.next.setPre(node.pre)
    node.setNext(null)
    node.setPre(null)
    this.length--;
    return node
}

LinkedList.prototype.findByIndex = function (index) {
    if (typeof index !== "number" || index < 0 || index >= this.length) return -1;
    let node, len;
    if (index === 0) {
        node = this.firstNode;
    } else if (index === this.length - 1) {
        node = this.endtNode;
    } else {
        if (index > Math.floor(this.length / 2)) {
            len = this.length - 1;
            node = this.endtNode;
            while (len > index) {
                len--;
                node = node.pre;
            }
        } else {
            len = 0;
            node = this.firstNode;
            while (len < index) {
                len++;
                node = node.next;
            }
        }
    }
    return node
}

LinkedList.prototype.pre = function (node) {
    if (!(node instanceof Node)) return false;
    this.unshift(this.removeByNode(node))
}
module.exports = LinkedList