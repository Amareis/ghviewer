import {search} from '../src/reducers';

let initState = {
    active: false,
    query: "",
    found: []
}

test('search', () => {
    let state;

    state = search(initState, {type:'QUERY_TYPED', query:'T'});
    expect(state).toEqual({active:true, query:'T', found:[]});

    state = search(state, {type:'QUERY_TYPED', query:'Test'});
    expect(state).toEqual({active:true, query:'Test', found:[]});

    state = search(state, {type:'QUERY_TYPED', query:''});
    expect(state).toEqual({active:false, query:'', found:[]});
});
