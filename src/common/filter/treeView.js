import React, { Component } from 'react';
import $ from 'jquery';

let allUsers = [];

function changeToChecked(ides, toCheck, users) {
    // console.log(allUsers);
    let cba = users;
    const idMap = cba.reduce(function merge(map, node) {
      map[node.id] = node;

      if (Array.isArray(node.users)) {
        node.users.reduce(merge, map);
      }

      return map;
    }, {});

    const ids = ides;
    const items = ids.map(id => idMap[id]);
    items.forEach(item => item.checked = toCheck);
    return cba;
}

function checkChilds(e, item) {
    // console.log(this.props.treeData);
    let idMap = [];
    if(item.length > 0) {
        idMap = item.reduce(function merge(map, node) {
          map[node.id] = node;

          if (Array.isArray(node.users)) {
            node.users.reduce(merge, map);
          }

          return map;
        }, {});
    }
    if(item.length === undefined) {
        idMap = [item].reduce(function merge(map, node) {
          map[node.id] = node;

          if (Array.isArray(node.users)) {
            node.users.reduce(merge, map);
          }

          return map;
        }, {});
    }
    // let allNestedIds = [];
    let idMapKeys = Object.keys(idMap);
    if(e.target.checked === true) {
        // console.log(idMapKeys);
        let checkedVal = changeToChecked(idMapKeys, true, this.props.treeData);
        let searchVal = this.state.searchVal === undefined ? "" : this.state.searchVal;
        function copy(o) {
            return Object.assign({}, o)
        }
        var res = checkedVal.map(copy).filter(function f(o) {
            if (o.name.includes(searchVal)) return true
            if (o.users) {
                return (o.users = o.users.map(copy).filter(f)).length
            }
        })
        this.setState({
            treeData: res
        })
    }
    else {
        this.setState({
            treeData: changeToChecked(idMapKeys, false, this.props.treeData)
        })
    }
}

function checkCChilds(e, item) {
    this.props.checkAllChild(e, item);
}

class TreeList extends Component {

    constructor() {
        super();
        this.updateData = this.updateData.bind(this);
    }

    toggleComponent(e, val) {
        $(e.target).parent().next().slideToggle();
        $(e.target).text($(e.target).text() === "+" ? "-" : "+");
    }

    updateData(e, item) {
        this.props.updateData(e, item);
    }

    render() {
        return (
            <ul>
                {this.props.treeData.map((item, index) => (
                    <li key={index}>
                        <div className="filter_name">
                            <input type="checkbox" checked={item.checked} onChange={(e) => this.updateData(e, item)} />
                            {item.name}
                            {item.users.length > 0 &&
                                <button className="filter_collapse" onClick={(e) => this.toggleComponent(e, 1)}>+</button>
                            }
                        </div>
                        <div className="inner_lists">
                            <TreeView treeData={item.users} updateData={this.updateData}></TreeView>
                        </div>
                    </li>
                ))}
            </ul>
        )
    }

}

class TreeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showUl: false,
        }
        checkCChilds = checkCChilds.bind(this);
        this.updateData = this.updateData.bind(this);
        this.toggleComponent = this.toggleComponent.bind(this);
    }

    updateData(e, item) {
        // console.log(this.props);
        this.props.checkAllChild(e, item)
    }

    toggleComponent(val, toBe) {
        // console.log(toBe);
        // $(e.target).parent().next().toggle();
        // $(e.target).text($(e.target).text() === "+" ? "-" : "+");
        this.props.onDoToggle(val, toBe);
    }

    render() {
        // console.log(this.props);
        const TreeLists = (props) => (
            <ul>
                {props.treeData.map((item, index) => (
                    <li key={index}>
                        <div className="filter_name">
                            <input type="checkbox" checked={item.checked == "false" || item.checked == false ? false : true} onChange={(e) => this.updateData(e, item)} />
                            {item.name}
                            {item.users.length > 0 &&
                                <button className="filter_collapse" onClick={(e) => this.toggleComponent(item, item.collapsed === "false" || item.collapsed === false ? "true" : "false")}>{item.collapsed === "false" || item.collapsed === false ? "+" : "-"}</button>
                            }
                        </div>
                        <div className="inner_lists" style={{display: item.collapsed == "false" || item.collapsed == false ? "none" : "block"}}>
                            <TreeLists treeData={item.users} updateData={this.updateData}></TreeLists>
                        </div>
                    </li>
                ))}
            </ul>
        );
        return (
            <div>
                <TreeLists treeData={this.props.treeData} />
            </div>
        )
    }

}

export default TreeView;
