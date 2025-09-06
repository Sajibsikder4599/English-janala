
const createElements = (arr)=>{

    const myelement = arr.map((element)=>{
         return `<span>${element}</span>`;

    })

    return myelement.join(",")
 
    }

    


// const createElements = (arr) => {
//   const returns = arr.map((element) => `<span>${element}</span>`);
//   return returns.join(" ");
// };
;
const manageSpiner = (status)=>{
  const spiner = document.getElementById("spiner");
   const wordContainer = document.getElementById("word-section");
    if(status==true){
      spiner.classList.remove("hidden");
      wordContainer.classList.add("hidden")

    }else{
       spiner.classList.add("hidden");
       wordContainer.classList.remove("hidden");
    }
}


const loadLesson = ()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
   .then(data=>{

displayData(data.data)

   }

   )
}


const removeActive=()=>{
    const btn = document.querySelectorAll(".active-btn"); 
    btn.forEach(button => {
        button.classList.remove("active");
    });
};



const leveWords = (id)=>{
manageSpiner(true);

   const url = `https://openapi.programming-hero.com/api/level/${id}`;
   fetch(url)
   .then(res=>res.json())
   .then(data=>{
    removeActive()
    const activeBtn = document.getElementById(`active-btn-${id}`);
    activeBtn.classList.add("active")

   wordData(data.data)

   }

   )

}

const wordId = (id)=>{
const url = `https://openapi.programming-hero.com/api/word/${id}`;
fetch(url)
.then(res=>res.json())
.then(data=>{
    wordDetails(data.data)
})

}

const wordDetails=(details)=>{
const modalBox = document.getElementById("modal-text");
modalBox.innerHTML = `


<h2 class="text-2xl"> ${details.word} (<i class="fa-solid fa-microphone-lines"></i>  ${details.pronunciation})</h2>
    <p>${details.meaning}</p>
    <p>${details.level}</p>
    <h3>example</h3>
    <p>${details.sentence}</p>
    <span>${details.partsOfSpeech}</span> <br>
   <div>
${createElements(details.synonyms)}
   
   
   </div>
  <button class="bg-[#422AD5] px-5 py-3 rounded-sm mt-2 text-white">compeleting learning</buttonclass=>



`;
document.getElementById("my_modal_5").showModal();
}




const  wordData =(words)=>{
let levelContainer = document.getElementById("level-container");
 levelContainer.innerHTML=' '


if(words == 0){
     levelContainer.innerHTML = `
     
     <div class="text text-center col-span-full">
      <img class=" m-auto" src="./english-janala-resources/assets/alert-error.png" alt="">
      <p class="text-xl py-2"><span>No vocabulary added here yet </span></p>
    <h2 class="text-2xl">Go to Next lesson</h2> 
    </div>
     
     
     `;
}



    for(let word of words){
     



       let newDiv = document.createElement("div")
        newDiv.innerHTML = `
        
        <div class="card bg-gray-50 h-full p-5 ">
    <h2 class="font-bold text-2xl py-5 text-center">${
      word.word ? word.word : "No word detect"
    }</h2>
    <p class="font-semibold my-3 text-[10px] text-center">${
      word.meaning ? word.meaning : "No neaning detect"
    }/${word.pronunciation ? word.pronunciation : "No neaning detect"}</p>
    <p class="font-normal py-2">" Meaning / Pronuncialtion"</p>
    <div class="icon-div flex justify-between  space-x-10">
      <span onclick="wordId(${word.id})"   class=" bg-[#412ad556] w-[60px] h-[40px]  rounded-sm flex items-center justify-center"><i class="fa-solid fa-circle-info"></i></span>
      <span class=" bg-[#412ad556] w-[60px] h-[40px] rounded-sm flex items-center justify-center">  <i class="fa-solid fa-volume-high bg-[#422ad51a] w-[00px]"></i></span>
    
    </div>
  </div>
        
        
        `;


levelContainer.appendChild(newDiv);
    }

manageSpiner(false);
}




displayData = (lessons)=>{
// console.log(lessons)
    const getbtn = document.getElementById("btn-div");

for(let lesson of lessons){
   const newDiv = document.createElement("div"); 

    newDiv.innerHTML = `
  <button  id="active-btn-${lesson.level_no}" onclick="leveWords(${lesson.level_no})" class="border-[#422ad5] border rounded-sm box-border ml-3 active-btn px-3 py-1 shadow-top cursor-pointer text-[#422ad5]
    mb-2"><i class="fa-brands fa-leanpub mr-2 my-1 text-center" ></i>Lesson-${lesson.level_no}</button>
      
   `;

   getbtn.appendChild(newDiv);

}


}


loadLesson()


// lessons.forEach(btnLesson => {
//     console.log(btnLesson)
//   
 
//  
    
// //   
// // }

// );
