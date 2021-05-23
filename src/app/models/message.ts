export class Message {
    constructor(
        private  id_message? : number, 
        private  sujet? : string, 
        private  date_envoi? : Date, 
        private  contenue? : string, 
        private  id_client? : number, 
        private  destination? : string, 
      
    ){}
}
