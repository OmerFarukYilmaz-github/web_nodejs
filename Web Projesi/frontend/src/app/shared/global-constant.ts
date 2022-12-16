export class GlobalConstant{
    public static genericError:string = "Something went wrong!";
    public static unauthroized:string = "You are not authroized to access this page!";

    // değerler doğru formatta olsun
    public static nameRegex: string = "[a-zA-Z0-9 ]*";
    public static mailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static contactNumberRegex: string = "^[e0-9]{10,10}$";

    public static error:string="error";

}