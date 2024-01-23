import { Pipe, PipeTransform } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

interface FoodNode {
    name: string;
    children?: FoodNode[];
}

interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}


@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {


    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: level,
        };
    }

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener(
        this._transformer, node => node.level, node => node.expandable, node => node.children);


    transform(items: any, searchText: string, treeControl: any): any {
        let dataSource = new MatTreeFlatDataSource(treeControl, this.treeFlattener);
        if (!searchText) {
            return items;
        }
        console.log('This is search text', searchText);
        console.log('These are items', items);
        const filteredItems = this.filterNodes(items.data, searchText.toLowerCase());
        dataSource.data = filteredItems;
        console.log('This is this.dataSource.data', dataSource);

        return dataSource;
    }

    private filterNodes(nodes: FoodNode[], searchText: string): FoodNode[] {
        let filteredNodes: FoodNode[] = [];

        console.log('These are nodes', nodes);
        nodes.forEach(node => {
            if (node.name.toLowerCase().includes(searchText)) {
                filteredNodes.push(node)
            } else if (node.children && node.children.length) {
                const filteredChildren = this.filterNodes(node.children, searchText);
                if (filteredChildren.length > 0) {
                    filteredNodes.push({ ...node, children: filteredChildren })
                }
            }

        })

        return filteredNodes;
    }
}