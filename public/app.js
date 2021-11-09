window.addEventListener('load',()=> {
    document.getElementById('button-task').addEventListener('click', ()=> {
        let noThings = document.getElementById('number-task').value;
        //console.log(noCups);
        
        //creating the object 
        let obj = {"number" : noThings};

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route noCups
        fetch('/noThings', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});

        //1.make a fetch request of type POST so that we can send the (numeber of Cups) info to the server
        //2.(在index.js里) add a route on server, that is listening for a post request,that is: app.get...

    })

    document.getElementById('get-tracker').addEventListener('click', ()=> {
        let total = 0;
        let dateab = document.getElementById('date').value;
        //console.log(dateab);
        //get info on ALL the coffees we've had so far
        fetch('/getThings')
        .then(response=> response.json())
        .then(data => {
            document.getElementById('task-info').innerHTML = '';
            //console.log(data.data);
            for(let i=0;i<data.data.length;i++) {
                let string =data.data[i].task  + " &nbsp;&nbsp;&nbsp;&nbsp; " + data.data[i].datea;
                let dateaa=data.data[i].datea;
                //console.log(dateaa);
                if(dateaa == dateab){
                    total += 1;
                    let elt = document.createElement('p');
                    elt.innerHTML = string;
                    document.getElementById('task-info').appendChild(elt);
                }
                
            }
            console.log(total);
            //calculate total number of cups
            let curData = data.data;
            let curTotal = 0;
            for (let i = 0; i < curData.length; i++){
                let numtask = curData[i].task;
                numtask = Number(numtask);
                //console.log(numCoffee);
                if (!isNaN(numtask)){
                    curTotal = curTotal + numtask;
                }
            }
            document.getElementById("total").innerHTML = total;
        })
    })
})