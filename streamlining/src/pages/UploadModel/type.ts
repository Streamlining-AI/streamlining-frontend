export interface FormUpload {
  name: string;
  url: string;
  modeltype : string;
  input: {
    name : string;
    type : string;
    default : string;
    description : string;
    ge? : number;
    le? : number;
  }[];
  output : string;
  paper : string;
  visibility : boolean;
  description : string;
  code: string;
}
