/* 
This code creates an interface which tells the data type of the todo list.
*/
interface Tasks{
    id : any, // here the type any is used because maybe in the future we want to generte id in terms of integer or string. 
    task : string,
    desc : string,
    completed : boolean
}
export default Tasks;