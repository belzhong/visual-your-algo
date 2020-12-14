// import { original, dataType, index, rowIndex, parent, directed, weighted } from './attribute/attributes.js';
// import { defineVuaAttributes } from './attribute/define_vua_attributes.js';
// import { graph } from './type/data_structure_types.js';
// import { tracers } from './tracer/tracer.js';
// import { read, write } from './type/operation_types.js';
// import { addSnapshot } from './snapshot/snapshot.js';

function GraphNode(value) {
  this.value = value;
}

function Graph(n, directed = false, weighted = false) {
  this.numberOfNode = n;
  this.directed = directed;
  this.weighted = weighted;
}

const graphNodeConstructorHandler = {
  construct(target, argumentsList, newTarget) {
  }
};

const graphNodeContainerConstructorHandler = {
  construct(target, argumentsList, newTarget) {
  }
};

const graphConstructorHandler = {
  construct(target, argumentsList, newTarget) {
  }
};
