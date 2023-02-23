export interface CardForm{
    imgUrl : string;
    name : string;
    author : string;
    desciption : string;
}

export interface Historydata{
    id : string;
    name : string;
    response : string;
    date : string;
}

export interface DashboardInput{
    data : CardForm[]
}