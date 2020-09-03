const motors = document.querySelector(".motors"),
    pumps = document.querySelector(".pumps");

const component = document.querySelector("#collection-component-1598749000920");
const component2 = document.querySelector("#collection-component-1598768066896");

function show() {
    this.style.display = "none"
}

function hide() {
    this.style.display = "block"
    console.log(this)

}

// const elements = {
//     t1: {
//         element: component,
//         visible: true
//     },

//     t2: {
//         element: component2,
//         visible: false
//     },

//     change() {
//         console.log("THIS")
//         console.log(`component: ${component}`)
//         for (let property in this) {
//             // console.log("aña")
//             // console.log(this[property].element) + "2312"
//             if (this[property].visible) {
//                 console.log("ayy")
//                 //console.log(this[property].component)
//                 // this[property].element.style.display = "block"
//             }
//         }
//     }
// }

//elements.change()

// motors.addEventListener("click", show.bind(component))

// pumps.addEventListener("click", hide.bind(component))

// pumps.addEventListener("click", hide.bind(component2))

motors.addEventListener("click", function() {
    hide.call(component2)
    show.call(component)

})

pumps.addEventListener("click", function() {
    hide.call(component)
    show.call(component2)
})

//pumps.addEventListener("click", hide.bind(component2))

