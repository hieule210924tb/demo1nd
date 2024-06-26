function resetInput(){
   document.getElementById("studentcode").value ="";
   document.getElementById("name").value ="";
   document.getElementById("age").value ="";
   document.getElementById("address").value =""
}
function validateInput() {
  var formElement = document.querySelector(".wrapper")
  var inputElement = formElement.querySelectorAll(".form-input")
  for(var i=0 ; i< inputElement.length; i++){
   if(inputElement[i].value ===""){
      inputElement[i].parentElement.querySelector(".error-message").innerHTML = ` Bạn chưa ${inputElement[i].placeholder}`
   }else
   inputElement[i].parentElement.querySelector(".error-message").innerHTML =""
  }
}
function addNew(){
   validateInput()
   var formElement = document.querySelector(".wrapper");
   var errorElement = document.querySelectorAll(".error-message")
   var arrerrorElement =[]
   for(var i=0; i< errorElement.length; i++){
      arrerrorElement.push(errorElement[i].innerHTML)
   }
   var checkErrorElement = arrerrorElement.every(value => value ==="")
   if(checkErrorElement){
      var studentcode = document.getElementById("studentcode").value;
      var name = document.getElementById("name").value;
      var age = document.getElementById("age").value;
      var address = document.getElementById("address").value;
      var listStudent = localStorage.getItem("list-student") ? JSON.parse(localStorage.getItem("list-student")) :[];
      listStudent.push({
         studentcode: studentcode,
         name:name,
         age:age,
         address:address
      })
      localStorage.setItem(("list-student") , JSON.stringify(listStudent));
      randerStudent()
      resetInput()
   }
}
function randerStudent(){
   var listStudent = localStorage.getItem("list-student") ? JSON.parse(localStorage.getItem("list-student")) :[];
   student =`<tr>
      <th>STT</th>
      <th>Mã sinh  viên</th>
      <th>Họ và tên</th>
      <th>Tuổi</th>
      <th>Địa chỉ</th>
      <th>Hành động</th>
   </tr>`
    listStudent.map((value, index) =>{
      student +=`<tr>
      <td>${index+1}</td>
      <td>${value.studentcode}</td>
      <td>${value.name}</td>
      <td>${value.age}</td>
      <td>${value.address}</td>
      <td>
        <button   class="btn btn-outline-info"  onclick="editStudent(${index})">Sửa</button>
        <button  class="btn btn-outline-info" onclick="deleteInput(${index})">Xóa</button>
      </td>
   </tr>`
    })
    document.getElementById("tableContent").innerHTML= student;
}
function editStudent(index){
   var listStudent = localStorage.getItem("list-student") ? JSON.parse(localStorage.getItem("list-student")) :[];
   document.getElementById("studentcode").value = listStudent[index].studentcode;
   document.getElementById("name").value = listStudent[index].name;
   document.getElementById("age").value = listStudent[index].age;
   document.getElementById("address").value = listStudent[index].address;
   document.getElementById("index").value = index

   document.getElementById("save").style.display= "none";
   document.getElementById("update").style.display= "inline-block"
   
}
function changeStudent(){
   var listStudent = localStorage.getItem("list-student") ? JSON.parse(localStorage.getItem("list-student")) :[];
   var index = document.getElementById("index").value
   listStudent[index]={
      studentcode : document.getElementById("studentcode").value,
      name : document.getElementById("name").value,
      age : document.getElementById("age").value,
      address : document.getElementById("address").value,
   }
   localStorage.setItem("list-student" , JSON.stringify(listStudent))
   document.getElementById("save").style.display= "inline-block";
   document.getElementById("update").style.display= "none"
   randerStudent()
   resetInput()
}
function deleteInput(index){
   var listStudent = localStorage.getItem("list-student") ? JSON.parse(localStorage.getItem("list-student")) :[];
   if(confirm("Ban co chac chan xoa khong")){
      listStudent.splice(index ,1)
   }
   localStorage.setItem("list-student" , JSON.stringify(listStudent))
   randerStudent();  
}