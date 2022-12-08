export interface CardForm{
    imgUrl : string;
    name : string;
    author : string;
    desciption : string;
}

export interface DashboardInput{
    data : CardForm[]
}