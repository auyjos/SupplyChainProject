
import ClientsList from "../Clients/List";


const Clients = ( props ) => {
    console.log(props)
    return(
        <div>

            <ClientsList sts={props.sts}/>
            
        </div>
    );
}

export default Clients;