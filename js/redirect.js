const parsedUrl = new URL(window.location.href);



var array = parsedUrl.toString().split("/");
var flower;


/*for(let i = 0; i < array.length; i++)
{
    
    
    if(array[i].includes("?flower"))
    {
        console.log(array[i])

        flower = array[i].replace("?flower=", "").replace("index.html", "")
            .replace("#", "");
        
        console.log(flower + "FLOWER")


        localStorage.setItem("flower", flower);
        console.log(parsedUrl.searchParams.get("flower")); // "123"
    }
}*/


/*if(parsedUrl.searchParams.get("flower"))
{
    flower = parsedUrl.searchParams.get("flower");
    

    localStorage.setItem("flower", flower);
    console.log(parsedUrl.searchParams.get("flower")); // "123"
}


if(!flower)
{
    console.log("yessaaa")
    localStorage.setItem("flower", "OTC BUILDING");
}*/



