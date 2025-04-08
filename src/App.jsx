import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Panel,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { Sidebar } from './components/sidebar';
import { ColdEmailNode, DelayNode, LeadSourceNode } from './components/custom-nodes';
import useStore from './components/store/flow-store';
import { Save } from 'lucide-react';

const nodeTypes = {
  coldEmail: ColdEmailNode,
  delay: DelayNode,
  leadSource: LeadSourceNode,
};

let id = 0;
const getId = () => `node_${id++}`;

function Flow() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();
  const { project } = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;
  
      const position = project({
        x: event.clientX,
        y: event.clientY,
      });
  
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
  
      useStore.getState().addNode(newNode);
    },
    [project]
  );
  

  const onSave = useCallback(() => {
    const flow = { nodes, edges };
    console.log('Saving flow:', flow);
  }, [nodes, edges]);

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 h-full relative" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
        style={{ height: '100%' }}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <Panel position="top-right">
            <button
              onClick={onSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Save className="h-4 w-4" />
              Save & Schedule
            </button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default App;
