import * as hyt from 'd3-hypertree';
import './d3-hypertree-light.css'
import { useEffect, useState } from 'react';
import * as d3 from 'd3'

export default function HyperTree(){
    const [data, setData] = useState(null)
    useEffect(()=> {
        (async () => {
            const dataPath = 'data/220719v2.json'
            const dataResponse = await fetch(dataPath)
            const data = await dataResponse.json()
            if (dataPath === 'data/mammalia.d3.json'){
                setData(data)
            }
            else{
                const stratify = d3
                .stratify()
                .id((d) => d.no)
                .parentId((d) => d.parent)
                const dataStratify = stratify(data)
                const root = d3.hierarchy(dataStratify)
                
                setData(root)
            }
        })()
    }, [])

    if (data == null) {
        return <div>loading</div>;
    }

    const ht = new hyt.Hypertree(
        {
            parent: document.body             
        },
        {
            dataloader: hyt.loaders.fromData(data),
            langInitBFS: (ht, n)=> n.precalc.label = n.data.data.data.Title,
            interaction: {
                onNodeClick: (n, m, l)=> { 
                    console.log(`#onNodeClick: Node=${n}, click coordinates=${m}, source layer=${l}`)
    
                    ht.api.goto({ re:-n.layout.z.re, im:-n.layout.z.im }, null)
                        .then(()=> l.view.hypertree.drawDetailFrame())       
                    /*
                    var s = n.ancestors().find(e=> true)                
                    ud.view.hypertree.api.toggleSelection(s)
                    ud.view.hypertree.args.interaction.onNodeSelect(s)
                    */
                    console.log(n.data.data.data.Title)
                },

                onCenterNodeChange: n=> console.log(`#onCenterNodeChange: Node=${n}`)
            }
        }
    )
    ht.initPromise
        .then(()=> new Promise((ok, err)=> ht.animateUp(ok, err)))            
        .then(()=> ht.drawDetailFrame())
}
