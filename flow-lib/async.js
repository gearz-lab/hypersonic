type seriesResultCallback = (error:any, results: Array<any>) => void;
declare module async {
    declare function series(functions:Array<(next:defaultCallback) =>  any>, callback: seriesResultCallback):any;
}