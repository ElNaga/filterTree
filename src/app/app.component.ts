import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    "name": "Fruit",
    "children": [
      {
        "name": "Apple",
        "children": [
          { "name": "Granny Smith" },
          { "name": "Red Delicious" },
          { "name": "Fuji" }
        ]
      },
      {
        "name": "Banana",
        "children": [
          { "name": "Cavendish" },
          { "name": "Plantain" },
          { "name": "Red Banana" }
        ]
      },
      {
        "name": "Citrus",
        "children": [
          { "name": "Orange" },
          { "name": "Lemon" },
          { "name": "Lime" }
        ]
      }
    ]
  },
  {
    "name": "Vegetables",
    "children": [
      {
        "name": "Green",
        "children": [
          { "name": "Broccoli" },
          { "name": "Spinach" },
          { "name": "Kale" }
        ]
      },
      {
        "name": "Root",
        "children": [
          { "name": "Carrots" },
          { "name": "Beets" },
          { "name": "Turnips" }
        ]
      },
      {
        "name": "Nightshades",
        "children": [
          { "name": "Tomatoes" },
          { "name": "Potatoes" },
          { "name": "Bell Peppers" }
        ]
      }
    ]
  },
  {
    "name": "Grains",
    "children": [
      {
        "name": "Cereals",
        "children": [
          { "name": "Wheat" },
          { "name": "Corn" },
          { "name": "Rice" }
        ]
      },
      {
        "name": "Pseudocereals",
        "children": [
          { "name": "Quinoa" },
          { "name": "Amaranth" },
          { "name": "Buckwheat" }
        ]
      }
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  localSearchString = '';

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    console.log(this.dataSource)
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
