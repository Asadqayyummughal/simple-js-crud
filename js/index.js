    let productsData = [];
    var formid = document.getElementById('add');
    let btnid = document.getElementById('submit')
    var subbid = document.querySelector("#submit");
    var updbtn = document.querySelector('#update');
    var pname;
    let pcatagory;
    let pdesc;
    // let img_url;
    let btndel;
    let btnedit
    updbtn.addEventListener('click', update)
    subbid.addEventListener('click', clickHandler);
    //load data
    function load() {
      if (localStorage.getItem('productsData') === null) {
        productsData = [];
      } else {
        productsData = JSON.parse(localStorage.getItem('productsData'));
        for (let i = 0; i < productsData.length; i++) {
          console.log('products array here:', productsData);
          var clg2 = document.querySelector('.col-lg-2');
          var cards = document.createElement('div');
          cards.setAttribute('id', i);
          cards.setAttribute('class', "cards");
          var h1 = document.createElement('h1');
          h1.setAttribute('id', `c-h1-${i}`);
          var para = document.createElement('p');
          para.setAttribute('id', `c-p1-${i}`);
          var para2 = document.createElement('p')
          para2.setAttribute('id', `c-p2-${i}`);
          btnedit = document.createElement('button');
          btnedit.addEventListener('click', (event) => {
          let cetdid = event.target.parentElement.getAttribute('id');
            console.log('check id of selected card in edit card', cetdid);
            editfunc(cetdid)
          });
          btndel = document.createElement('button');
          btndel.innerHTML = 'Delete'
          btndel.setAttribute('class', 'delbtn');
          btndel.setAttribute('id', i);
          btndel.addEventListener('click', (event) => {
           let pid = event.target.parentElement.getAttribute('id')
            delfunc(pid)
          })
          btnedit.innerHTML = 'Edit';
          h1.innerHTML = productsData[i].name;
          para.innerHTML = productsData[i].pcatagoory;
          para2.innerHTML = productsData[i].textarea;
          cards.appendChild(h1);
          cards.appendChild(para);
          cards.appendChild(para2);
          cards.appendChild(btndel);
          cards.appendChild(btnedit);
          clg2.appendChild(cards);


        }
      }
    }
    load()
    //post method
    function clickHandler(event) {
      event.preventDefault();
      let id;
      productsData = JSON.parse(localStorage.getItem('productsData'));
      if (productsData === null) {
        id = 0;
      } else {
        id = productsData.length;
      }
      console.log('productsData', productsData)
      console.log('check array length:', +id);
      pname = document.getElementById("pname").value;
      pcatagory = document.getElementById("pcatagory").value;
      pdesc = document.getElementById("tarea").value;
      let obj = {
        "name": pname,
        "pcatagoory": pcatagory,
        "textarea": pdesc,
        "id": id,

      }
      storeOnLocalStorage(obj)
      var clg2 = document.querySelector('.col-lg-2');
      var cards = document.createElement('div');
      cards.setAttribute('id', id);
      cards.setAttribute('class', "cards");
      var h1 = document.createElement('h1');
      h1.setAttribute('id', `c-h1-${id}`);
      var para = document.createElement('p');
      para.setAttribute('id', `c-p1-${id}`);
      var para2 = document.createElement('p');
      console.log('reached heree');
      para2.setAttribute('id', `c-p2-${id}`);
      btnedit = document.createElement('button');
      btnedit.setAttribute('id', id);
      btnedit.innerHTML = 'Edit';
      btnedit.addEventListener('click', (event) => {
      let cetdid = event.target.parentElement.getAttribute('id');
        console.log('check id of selected card in edit card', cetdid);
        editfunc(cetdid)
      });
      btndel = document.createElement('button');
      btndel.innerHTML = 'Delete'
      btndel.setAttribute('class','delbtn');
      btndel.setAttribute('id', id);
      btndel.addEventListener('click', (event) => {
      let pid = event.target.parentElement.getAttribute('id')
        delfunc(pid)
      })
      h1.innerHTML = obj.name;
      para.innerHTML = obj.pcatagoory;
      para2.innerHTML = obj.textarea;
      cards.appendChild(h1);
      cards.appendChild(para);
      cards.appendChild(para2);
      cards.appendChild(btndel);
      cards.appendChild(btnedit);
      clg2.appendChild(cards);
      // });
    }
    //delfunction
    function delfunc(par) {
      if(confirm('Are you wanted to delete the product'))
      {
        pid = par;
      console.log('checking parent element id here:', pid);
      document.getElementById(pid).remove();
      let productsData = JSON.parse(localStorage.getItem('productsData'));
      productsData.splice(pid, 1);
      localStorage.setItem('productsData', JSON.stringify(productsData))

      }
      else{
        return;
      }

      
    }
    //editfunction
    function editfunc(cetdid) {
      let gname = productsData[cetdid].name;
      let gcat = productsData[cetdid].pcatagoory;
      let gdesc = productsData[cetdid].textarea;
      let getid = productsData[cetdid].id;
      document.getElementById("pname").value = gname
      document.getElementById("pcatagory").value = gcat
      document.getElementById("tarea").value = gdesc;
      document.getElementById('hidden-field').value = getid;
      console.log('check id of selected card in edit card', cetdid);
      subbid.style.display = 'none';
      updbtn.style.display = 'block';
      localStorage.setItem('hiddenid',cetdid)

    }
    // update function
    function update(event) {
      productsData = JSON.parse(localStorage.getItem('productsData'));
      event.preventDefault();
      let hid = localStorage.getItem('hiddenid');
      console.log('CHECK HIDDEN ID', hid);
      var father = document.getElementById(hid);
      let newname = document.getElementById("pname").value;
      let newcat = document.getElementById("pcatagory").value;
      let newdes = document.getElementById("tarea").value;
      productsData.splice(hid, 1, {
        "name": newname,
        "pcatagoory": newcat,
        "textarea": newdes,
        "id": hid
      });
      localStorage.setItem('productsData', JSON.stringify(productsData))
      var fc = father.querySelector(`#c-h1-${hid}`);
      fc.innerHTML = productsData[hid].name;
      var sc = father.querySelector(`#c-p1-${hid}`)
      sc.innerHTML = productsData[hid].pcatagoory;
      var tc = father.querySelector(`#c-p2-${hid}`)
      tc.innerHTML = productsData[hid].textarea;
    }
    //store on local storage
    function storeOnLocalStorage(obj) {
      console.log('check obj', obj);
      productsData;
      if (localStorage.getItem('productsData') === null) {
        productsData = [];
      } else {
        productsData = JSON.parse(localStorage.getItem("productsData"));
      }
      productsData.push(obj);
      localStorage.setItem("productsData", JSON.stringify(productsData));
    }
  