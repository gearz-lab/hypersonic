declare module underscore {
    declare function object(a:Array<any>): any;
    declare function map<Tout, Tin>(a:Array<Tin>, f: (x: Tin) => Tout  ): Array<Tout>;
    declare function each<T>(list:Array<T>, iteratee: (item:T) => void): void;
}