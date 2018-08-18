console.log("siema")
// ------------------------- variables ------------------------<
const exerciseList =  document.querySelector("#exercise-list");
const form = document.querySelector("#add-task");
// -----------------------<

// create elements and append to dom
function renderList(doc){
let list = document.createElement("li");
let exerciseName = document.createElement("span");
let series = document.createElement("span");
let reps = document.createElement("span");
let close = document.createElement("div");
close.className = "close";
close.textContent = "x";
list.setAttribute('data-id' , doc.id);

exerciseName.textContent = doc.data().exerciseName;
series.textContent = doc.data().series;
reps.textContent = doc.data().reps;

list.appendChild(exerciseName);
list.appendChild(series);
list.appendChild(reps);
list.appendChild(close);
exerciseList.appendChild(list)

// deleting data by using btn

close.addEventListener("click", (e)=>{
  e.stopPropagation();

  let id = e.target.parentElement.getAttribute('data-id');
  db.collection('exercise').doc(id).delete();
})

console.log(doc.data().reps)
}
//  this is how we get data from BASE !
// db.collection('exercise').orderBy("exerciseName").get().then((snapshot)=>{
//   snapshot.docs.forEach(doc =>{
//       console.log(doc.data())
//       renderList(doc)
//       // we add doc each time arround // every document will call for data
//   })
//
// });

// saving data by form

form.addEventListener("submit",(evt)=>{
  evt.preventDefault()
  db.collection('exercise').add({
    exerciseName: form.name.value,
    series: form.series.value,
    reps: form.reps.value
  });
   form.name.value = '';
   form.series.value = '';
   form.reps.value = '';
})

// real-time Listener
db.collection('exercise').onSnapshot(snapshot =>{
  let changes = snapshot.docChanges();

  changes.forEach(change =>{
    if(change.type == 'added'){
      renderList(change.doc);
    }else if(change.type == 'removed'){
      let li = exerciseList.querySelector('[data-id=' + change.doc.id + ']');
      exerciseList.removeChild(li)
    }
  })
})
