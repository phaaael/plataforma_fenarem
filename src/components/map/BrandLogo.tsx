export function BrandLogo({src,alt,x,y,width,height}:{src:string;alt:string;x:number;y:number;width:number;height:number}){
 return <image href={src} aria-label={alt} x={x+width*.12} y={y+height*.15} width={width*.76} height={height*.7} preserveAspectRatio="xMidYMid meet"/>;
}
