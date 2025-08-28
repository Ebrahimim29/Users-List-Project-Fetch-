const tbody = document.getElementById("tbody");
function loadUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data =>{

        document.getElementById("table").style.opacity = "1";
        tbody.innerHTML = "";

        data.forEach(user => {
        tbody.innerHTML += `<tr id="user-${user.id}">
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address.city} , ${user.address.street}</td>

            <td>
            <button onclick ="deleteUser(${user.id})">حذف</button>
            <button onclick = "editUser(${user.id},'${user.name}','${user.email}')>ویرایش</button>            
            </td>            
          </tr>`;
            // چون مقادیر نام و ایمیل در دکمه ویرایش به صورت استرینگ قراره ارسال بشه باید داخل کوتیشن قرار بگیرد
            console.log(user);            
        });
    });
}

// اضافه کردن کاربر (HTTP Method POST)

function addUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({name: name , email: email , phone: phone}),
  headers: {'Content-type': 'application/json; charset=UTF-8'}
  //headers:  یک اطلاعات به سرور می دهیم که ما داده هایمان را در چه قالبی می خواهیم ارسال بکنیم و این اطلاعات رو از بک اند دولوپر می گیریم
})
.then(res => res.json())
.then(user =>{
    alert("کاربر با موفقیت ارسال شد، ولی ذخیره نمی شود چون API تستی است");
    console.log("POST response:" , user); 

    
     //این قسمت صرفا برای نمایش اطلاعات اضافه شده است، چون دیتاهای جیسون پلیس هولدر تغییر ناپذیر است و می خواهیم تغییرات را با این وجود باز هم ببینیم
    tbody.innerHTML += `<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.phone}</td>
    <td>${user.email}</td>
    <td> </td>
    
    <td>
    <button onclick = "deleteUser(${user.id})">حذف</button>
    <button onclick = "editUser(${user.id} ,'${user.name}','${user.phone}' ,'${user.email}')>ویرایش</button>
    
    </td>
    
    </tr>`;
});
}

// حذف کاربر
function deleteUser(id) {
    fetch('https://jsonplaceholder.typicode.com/users/${id}', {
      method: 'DELETE',
    })
    //تفاوت با دو متد بالا این است که خروجی را در پارامتر ریسپانس ذخیره نمی کنیم. چون صرفا قراره یک آی دی رو حذف کنیم
    .then(()=>{
        alert(`کاربر با شناسه ${id} حذف شد (فقط در ظاهر، چون API تستی است)`);
        loadUsers(); //بازخوانی لیست
    });
}

// ویرایش کاربر
function editUser(id , oldName , oldEmail) {
    const newName = prompt("نام جدید خود را وارد کنید:" , oldName);
    // const newPhone = prompt("تلفن جدید را وارد کنید:" , oldPhone);
    const newEmail = prompt("ایمیل جدید را وارد کنید:" , oldEmail);

    if (!newName || !newEmail) {
        alert("ورودی نامعتبر است😨");
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/users/${id}', {
      method: 'PATCH',
      body: JSON.stringify({ name : newName , email : newEmail }), //name , email
      headers: {'Content-type': 'application/json; charset=UTF-8'}
    })
    .then(res => res.json())
    .then(updated =>{

        console.log(updated);
        
        alert("ویرایش انجام شد(به صورت نمایشی)😎");
    })

    // اعمال تغییرات به صورت نمایشی
    const row = document.getElementById('user-${id}');
    row.children[1].textContent = updated.name;
    row.children[3].textContent = updated.email;
}
loadUsers()