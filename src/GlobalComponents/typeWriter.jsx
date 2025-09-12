import { Typewriter } from 'react-simple-typewriter'
function Read() {
    return (
        <h1 style={{marginLeft:'500px'}}>
        This is the one {" "}

        <Typewriter
            words={["Raj Kumar", "Manish Thakur"]}
            loop= {true}
            cursor
            cursorStyle= "|| "
            typeSpeed={40}
            deleteSpeed={80}
            delaySpeed={1000}
        />
        </h1>
    )
}
export default Read;