import React from 'react';
import axios from 'axios';
import { withRouter} from 'react-router-dom';
import ENDPOINTS from '../endpoints';
import TreeView from './treeView';

let allUsers = [];
let selectedUsers = [];

function changeToChecked(ides, toCheck) {
    let cba = allUsers;
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
    return allUsers;
}

function checkChilds(e, item) {
    // console.log(item.length);
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
        let checkedVal = changeToChecked(idMapKeys, true);
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
            treeData: changeToChecked(idMapKeys, false)
        })
    }
}

function selectUser(e, item) {
    // console.log(e);
    if(e.target.checked === true) {
        selectedUsers.push(item);
        // console.log(selectedUsers);
    }
    else {
        selectedUsers = selectedUsers.filter((elem) => {
            return elem.id !== item.id;
        })
        // console.log(selectedUsers);
    }
}

class UserFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            treeData: allUsers,
            searchValue: "",
            userLoading: false
        }
        checkChilds = checkChilds.bind(this);
    }

    doSearch(e) {
        function copy(o) {
            return Object.assign({}, o)
        }
        var res = allUsers.map(copy).filter(function f(o) {
            if (o.name.includes(e.target.value)) return true
            if (o.users) {
                return (o.users = o.users.map(copy).filter(f)).length
            }
        })
        this.setState({
            treeData: res,
            searchValue: e.target.value
        })
    }

    getAllSubordinates() {
        this.setState({
            userLoading: true,
            treeData: []
        })
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "wtoken": localStorage.getItem("authToken"),
            }
        };
        axios.get(ENDPOINTS.get_subordinates, axiosConfig)
            .then(res => {
                // console.log(res);
                if(res.data.status && res.data.status == 401) {
                    this.props.history.push('/');
                }
                else {
                    allUsers = res.data;
                    this.setState({
                        treeData: res.data,
                        userLoading: false
                    })
                }
            })
    }

    componentDidMount() {
        this.getAllSubordinates();
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    doToggleChange(item, data, toBe) {
        item.forEach(function iter(a) {
            if (data.includes(a.id)) {
                a.collapsed = toBe;
            }
            Array.isArray(a.users) && a.users.forEach(iter);
        });
        return item;
    }

    onToggle(item, toBe) {
        // console.log(toBe);
        // console.log(this.doToggleChange(this.state.treeData, [e.id]));
        allUsers = this.doToggleChange(allUsers, [item.id], toBe);
        if (this._isMounted) {
            this.setState({
                treeData: this.doToggleChange(this.state.treeData, [item.id], toBe)
            })
        }
        // console.log(e);
    }

    checkAllFilter() {
        let checkAll = this.state.users.map((elem) => {
            return {
                id: elem.id,
                name: elem.name,
                checked: true
            }
        })
        this.setState({
            users: checkAll,
            initialUsers: checkAll
        })
        for(let i = 0; i < this.state.users.length; i++) {
            // console.log("chk_" + this.props.filterId + "_" + i);
            let eve_nt = {
                target: {
                    checked: true
                }
            }
            selectUser(eve_nt, this.state.users[i]);
            // this.refs["chk_" + this.props.filterId + "_" + i].checked = true;
        }
    }

    unCheckAllFilter() {
        let checkAll = this.state.users.map((elem) => {
            return {
                id: elem.id,
                name: elem.name,
                checked: false
            }
        })
        this.setState({
            users: checkAll
        })
        for(let i = 0; i < this.state.users.length; i++) {
            // console.log("chk_" + this.props.filterId + "_" + i);
            let eve_nt = {
                target: {
                    checked: false
                }
            }
            selectUser(eve_nt, this.state.users[i]);
            // this.refs["chk_" + this.props.filterId + "_" + i].checked = false;
        }
    }

    doSearchUser(e) {
        var updatedList = this.state.initialUsers;
        updatedList = updatedList.filter(function(item){
            return item.name.search(e.target.value) !== -1;
        });
        // console.log(updatedList);
        this.setState({
            users: updatedList
        })
    }

    doCheckUser(e, item) {
        // console.log(e.target.checked);
        if(e.target.checked === true) {
            let allUsers = this.state.users;
            let getUserById = allUsers.filter(elem => {
                return elem.id === item.id
            })
            getUserById[0].checked = true;

            let allInitialUsers = this.state.initialUsers;
            let getInitialUserById = allUsers.filter(elem => {
                return elem.id === item.id
            })
            getInitialUserById[0].checked = true;

            this.setState({
                users: allUsers,
                initialUsers: allInitialUsers
            })
        }
        else {
            let allUsers = this.state.users;
            let getUserById = allUsers.filter(elem => {
                return elem.id === item.id
            })
            getUserById[0].checked = false;

            let allInitialUsers = this.state.initialUsers;
            let getInitialUserById = allUsers.filter(elem => {
                return elem.id === item.id
            })
            getInitialUserById[0].checked = false;

            this.setState({
                users: allUsers,
                initialUsers: allInitialUsers
            })
        }
        // console.log(allUsers);
    }

    changeToChecked(ides, toCheck) {
        let cba = allUsers;
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
        return allUsers;
    }

    checkChilds(e, item) {
        // console.log(e);
        // console.log(item);
        // e.preventDefault();
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
            let checkedVal = changeToChecked(idMapKeys, true);
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
            if (this._isMounted) {
                this.setState({
                    treeData: res
                })
                this.props.onUpdateUser(res);
            }
        }
        else {
            if (this._isMounted) {
                this.setState({
                    treeData: changeToChecked(idMapKeys, false)
                })
                this.props.onUpdateUser(changeToChecked(idMapKeys, false));
            }
        }
    }

    render() {
        // console.log(this.props.users);
        return (
            <div className="select_user_filter">
                <h3 className="filter_title">
                    Filter by User
                    {/*<span className="check_uncheck">
                        <button onClick={this.checkAllFilter.bind(this)}><img src={IMAGE.check} alt="" /></button>
                        <button onClick={this.unCheckAllFilter.bind(this)}><img src={IMAGE.uncheck} alt="" /></button>
                    </span>*/}
                </h3>
                <div className="search_user">
                    <input type="text" onChange={this.doSearch.bind(this)} value={this.state.searchValue} placeholder="Search..." />
                    {/*<input type="text" placeholder="Search..." onChange={this.doSearchUser.bind(this)} />*/}
                    <div className="select_deselect">
                        <button onClick={() => this.checkChilds({target:{checked:true}}, allUsers)}>Select All</button>
                        <button onClick={() => this.checkChilds({target:{checked:false}}, allUsers)}>Deselect All</button>
                    </div>
                </div>
                {/*<input onChange={this.doSearch.bind(this)} value={this.state.searchValue} />
                {this.state.searchValue}*/}
                <div className="treeview_wrapper">
                    {this.state.userLoading == true && <div style={{paddingLeft: 10}}>Loading...</div>}
                    <TreeView onDoToggle={(item, toBe) => this.onToggle(item, toBe)} checkAllChild={(e, item) => this.checkChilds(e, item)} treeData={this.state.treeData} />
                </div>
                {/*<ul className="user_list">
                    {this.state.users.map((item, index) => (
                        <li className="indent" key={item.id}>
                            <input
                                onChange={(e) => {selectUser(e, item); this.doCheckUser(e, item)}}
                                type="checkbox"
                                id={'chk_' + this.props.filterId + "_" + index}
                                checked={item.checked} />
                            <label htmlFor={'chk_' + this.props.filterId + "_" + index}>{item.name}</label>
                        </li>
                    ))}
                </ul>*/}
            </div>
        )
    }

}

export default withRouter(UserFilter);
