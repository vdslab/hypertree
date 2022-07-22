import * as hyt from 'd3-hypertree';
import './d3-hypertree-light.css'

export default function HyperTree({data}){
    const ht = new hyt.Hypertree(
        {
            parent: document.body             
        },
        {
            dataloader: hyt.loaders.fromData(data),
            langInitBFS: (ht, n)=> n.precalc.label = n.data.name,
        }
    )
    ht.initPromise
        .then(()=> new Promise((ok, err)=> ht.animateUp(ok, err)))            
        .then(()=> ht.drawDetailFrame())
}
