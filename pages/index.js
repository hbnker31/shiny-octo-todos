import React from 'react';
import moment from 'moment';
import _ from 'lodash';
export default function Home({data}) {
  const [newtitle, setNewtitle] = React.useState(''); 
  const [newBody, setNewBody] = React.useState('');
  const [initialData, setinitialData] = React.useState(data);
  const deleteTodo = (id=NULL) => {
    document.getElementById(id).remove();
  }
  const addTodo = (id=NULL) => {
    var div = document.createElement('div');
    var getLastId = initialData.reverse()[0].id + 1;
    div.innerHTML = `<div className="card-body">
    <h1 className="card-title">${newtitle.charAt(0).toUpperCase() + newtitle.slice(1)}</h1>
    <p className="card-text">">${newBody.charAt(0).toUpperCase() + newBody.slice(1)}</p>
    <span>
      <i className='fa fa-plus' onClick={addTodo(${getLastId+1})}></i>
    </span>
    <span>
      <i className='fa fa-times' onClick={deleteTodo(${getLastId+1})}></i>
    </span>
  </div>`;
  if(id !== NULL){
    document.getElementById(id).appendChild(div);
  }else{
    var newTodo = {
      id: getLastId,
      title: newtitle,
      body: newBody
    }
    setinitialData((previous)=>{
      previous.push(newTodo)
    })
  }
}
  const findStatus = (id='')=>{
    switch(id){
      case id % 3 === 0:
        return 'success';
      case id % 2 == 0:
        return 'warning';
      default:
        return 'danger';
    }
  }
  React.useEffect(()=>{
    var checkTitle =  initialData.filters(data => data.title.contains(newtitle));
    var checkBody  =  initialData.filters(data => data.body.contains(newBody));

    setTimeout(()=>{
      if(newtitle.length <= 0){
        return
      }
      if(newBody.length <= 0){
        return
      }
      if(checkTitle.length > 0){
        alert('Title is already exist');
      }
      if(checkBody.length > 0){
        alert('Body is already exist');
      }
      if(checkTitle.length > 0 && checkBody.length > 0){
        alert('Title and Body is already exist');
      }
    },400)
  },[newtitle,newBody,initialData])
  React.useLayoutEffect(()=>{
    setinitialData(previous=>_.orderBy(previous, 'title', 'asc'))
  },[initialData])
  return (
    <React.Fragment>
      <div className="container">
        <form onSubmit={addTodo()}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Title</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter title" onChange={(e) => setNewtitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Body</label>
            <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter body" onChange={(e) => setNewBody(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {initialData.map(item => {
          if(findStatus(item.id) === 'success'){
            <div className="card" key={item.id} id={item.id.toString()}>
              <div className="card-body">
                <h1 className="card-title">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h1>
                <p className="card-text">{item.body.charAt(0).toUpperCase() + item.body.slice(1)}</p>
                <span>
                  <i className='fa fa-plus' onClick={addTodo(item.id)}></i>
                </span>
                <span>
                  <i className='fa fa-times' onClick={deleteTodo(item.id)}></i>
                </span>
                <span>
                  <i className='fa fa-clock'></i>
                  <div>{moment().format("MM ddd, YYYY HH:mm:ss a")}</div>
                </span>
              </div>
            </div>
          }
          if(findStatus(item.id) === 'warning'){
              <div className="card bg-warning" key={item.id} id={item.id}>
                <div className="card-body">
                  <h1 className="card-title">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h1>
                  <p className="card-text">{item.body.charAt(0).toUpperCase() + item.body.slice(1)}</p>
                  <span>
                    <i className='fa fa-plus' onClick={addTodo(item.id)}></i>
                  </span>
                  <span>
                    <i className='fa fa-times' onClick={deleteTodo(item.id)}></i>
                  </span>
                  <span>
                  <i className='fa fa-clock'></i>
                  <div>{moment().format("MM ddd, YYYY HH:mm:ss a")}</div>
                </span>
                </div>
              </div>
            }
            if(findStatus(item.id) === 'danger'){
              <div className="card bg-danger" key={item.id} id={item.id}>
                <div className="card-body">
                  <h1 className="card-title">{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h1>
                  <p className="card-text">{item.body.charAt(0).toUpperCase() + item.body.slice(1)}</p>
                  <span>
                    <i className='fa fa-plus' onClick={addTodo(item.id)}></i>
                  </span>
                  <span>
                    <i className='fa fa-times' onClick={deleteTodo(item.id)}></i>
                  </span>
                  <span>
                  <i className='fa fa-clock'></i>
                  <div>{moment().format("MM ddd, YYYY HH:mm:ss a")}</div>
                  </span>
                </div>
              </div>
            }
        })}
      </div>
    </React.Fragment>
  )
}
export async function getStaticProps() {
  fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=200')
  .then(response => response.json())
  .then(json => {
    return{
      props: {
        data: json
      }
    }
  })
}