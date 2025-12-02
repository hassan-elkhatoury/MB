"use client"

import { motion } from "framer-motion"
import { CodeBlock } from "../code-block"
import { Play, CheckCircle2, Terminal } from "lucide-react"

export function SlideStartCluster2() {
  const output1 = `CONTAINER ID   STATUS     IMAGE         PORTS                       NAMES
89b1c9bbb854   mongo:6.0  Up 2 minutes  0.0.0.0:27020->27020/tcp,   mongos      
646a9746b855   mongo:6.0  Up 2 minutes  0.0.0.0:26050->26050/tcp,   config2  
1eb9caa3c625   mongo:6.0  Up 2 minutes  0.0.0.0:27017->27017/tcp,   rs1_p       
5908f90167bb   mongo:6.0  Up 2 minutes  0.0.0.0:27018->27018/tcp,   rs2_s2      
a8a45e1d87ba   mongo:6.0  Up 2 minutes  0.0.0.0:27019->27019/tcp,   rs3_s2`

  const output2 = `CONTAINER ID   STATUS     IMAGE         PORTS                       NAMES
89b1c9bbb854   mongo:6.0  Up 2 minutes  0.0.0.0:27020->27020/tcp,   mongos      
646a9746b855   mongo:6.0  Up 2 minutes  0.0.0.0:26050->26050/tcp,   config3    
1eb9caa3c625   mongo:6.0  Up 2 minutes  0.0.0.0:27018->27018/tcp,   rs2_p       
5908f90167bb   mongo:6.0  Up 2 minutes  0.0.0.0:27019->27019/tcp,   rs3_s3      
a8a45e1d87ba   mongo:6.0  Up 2 minutes  0.0.0.0:27017->27017/tcp,   rs1_s2`

  const output3 = `CONTAINER ID   STATUS     IMAGE         PORTS                       NAMES
89b1c9bbb854   mongo:6.0  Up 2 minutes  0.0.0.0:27020->27020/tcp,   mongos      
646a9746b855   mongo:6.0  Up 2 minutes  0.0.0.0:26050->26050/tcp,   config4    
1eb9caa3c625   mongo:6.0  Up 2 minutes  0.0.0.0:27019->27019/tcp,   rs3_p       
5908f90167bb   mongo:6.0  Up 2 minutes  0.0.0.0:27018->27018/tcp,   rs2_s3      
a8a45e1d87ba   mongo:6.0  Up 2 minutes  0.0.0.0:27017->27017/tcp,   rs1_s3`

  return (
    <div className="w-full max-w-5xl mx-auto h-full  py-4">
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-secondary" />
            <span className="font-semibold">Sortie Attendue</span>
          </div>
          <div className="h-full overflow-y-auto space-y-6">
            <CodeBlock code={output1} language="text" title="docker ps" />
            <CodeBlock code={output2} language="text" title="docker ps" />
            <CodeBlock code={output3} language="text" title="docker ps" />
          </div>


        </motion.div>

      </div>
    </div>
  )
}
