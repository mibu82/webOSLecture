window.onload = function () {
  // setItem method 호출을 위한 event listener
  const setitem_button = document.getElementById("setitem-btn");
  setitem_button.addEventListener('click', function (e) { // 'e'란 무엇인가? (https://stackoverflow.com/questions/35936365/what-exactly-is-the-parameter-e-event-and-why-pass-it-to-javascript-functions)
    console.log("setItem button is clicked. Save key-value pair!");

    // 입력한 key-value 값을 받아옴
    let setitem_key = document.getElementById("setitem-key-input").value;
    let setitem_value = document.getElementById("setitem-value-input").value;

    if ((!setitem_key) || (!setitem_value)) { // key나 value 중 하나라도 입력되지 않은 경우
      document.getElementById("console-window").innerHTML = "Please enter a key-value pair.";
      console.log("setItem() failed!");
    }
    else if (localStorage.getItem(setitem_key)) { // 기존에 local storage 안에 존재하는 key인 경우
      console.log("key: " + setitem_key + ", value: " + setitem_value);
      console.log("key: " + setitem_key + " already exists. Overwrite this value.");
      document.getElementById("console-window").innerHTML = "key: " + setitem_key + " already exists. Overwrite this value.";

      // local storage에 key-value 저장 (기존 값 덮어쓰기)
      localStorage.setItem(setitem_key, setitem_value);
      
      console.log("setItem() succeeded!");
    }
    else { // 신규로 입력된 key인 경우
      console.log("key: " + setitem_key + ", value: " + setitem_value);
      document.getElementById("console-window").innerHTML = "Save (key: " + setitem_key + ", value: " + setitem_value + ") in local storage.";

      // local storage에 key-value 저장
      localStorage.setItem(setitem_key, setitem_value);
      
      console.log("setItem() succeeded!");
    }
  });

  // clear method 호출을 위한 event listener
  const clear_button = document.getElementById("clear-btn");
  clear_button.addEventListener('click', function (e) {
    console.log("clear button is clicked. Delete all key-value pairs!");

    // local storage 안의 모든 key-value 삭제
    localStorage.clear();

    document.getElementById("console-window").innerHTML = "Delete all key-value pairs in local storage.";
    console.log("clear() succeeded!");
  });
  
  // removeItem method 호출을 위한 event listener
  const removeitem_button = document.getElementById("removeitem-btn");
  removeitem_button.addEventListener('click', function (e) {
    console.log("removeItem button is clicked. Remove the key-value pair!");

    // 입력한 key 값을 받아옴
    let removeitem_key = document.getElementById("removeitem-key-input").value;

    if (!localStorage.getItem(removeitem_key)) { // local storage 안에 삭제하려는 key가 없는 경우
      document.getElementById("console-window").innerHTML = "The key \""+ removeitem_key + "\" doesn't exist in local storage.";
      console.log("The key \""+ removeitem_key + "\" doesn't exist in local storage.");
      console.log("removeItem() failed!");
    }
    else { // local storage 안에 삭제하려는 key가 있는 경우

      // local storage에서 주어진 key값에 해당하는 key-value pair를 삭제
      localStorage.removeItem(removeitem_key);

      console.log("key: " + removeitem_key + " is removed.");
      document.getElementById("console-window").innerHTML = "key: " + removeitem_key + " is removed.";
      console.log("removeItem() succeeded!");
    }
  });
  
  // getItem method 호출을 위한 event listener
  const getitem_button = document.getElementById("getitem-btn");
  getitem_button.addEventListener('click', function (e) {
    console.log("getItem button is clicked. Get a value using key!");

    // 입력한 key 값을 받아옴
    let getitem_key = document.getElementById("getitem-key-input").value;
  

    if (!localStorage.getItem(getitem_key)) { // local storage 안에 불러오려는 key가 없는 경우
      console.log("The key \""+ getitem_key + "\" doesn't exist in local storage.");
      document.getElementById("console-window").innerHTML = "The key \""+ getitem_key + "\" doesn't exist in local storage.";
      console.log("getItem() failed!");
    }
    else { // local storage 안에 불러오려는 key가 있는 경우

      // local storage에서 주어진 key값에 해당하는 key-value pair를 찾아 변수에 저장
      let getitem_value = localStorage.getItem(getitem_key);

      console.log("key: " + getitem_key + ", value: " + getitem_value);
      document.getElementById("console-window").innerHTML = "key: " + getitem_key + ", value: " + getitem_value;
      console.log("getItem() succeeded!");
    }

  });

  // local storage에 저장된 전체 목록을 출력하기 위한 event listener
  const refresh_button = document.getElementById("refresh-btn");
  refresh_button.addEventListener('click', function(e) {
    console.log("Refresh button is clicked. Print the current status of the local storage!");

    let result;
    let tmp_buffer;

    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      const value = window.localStorage.getItem(key);
      
      tmp_buffer = "(" + i + ") key: " + key + ", value: " + value;
      console.log(tmp_buffer);

      if (i == 0)
        result = tmp_buffer  + "<br />";
      else
        result += (tmp_buffer + "<br />");
    }
    document.getElementById("storage-status-window").innerHTML = result;
  });
}
