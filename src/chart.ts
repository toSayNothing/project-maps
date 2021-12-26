// 1. generate chart html from config
import * as echarts from "echarts/core";
import type { EChartsOption } from "echarts";
import { TooltipComponent } from "echarts/components";
import { TreeChart } from "echarts/charts";
import { SVGRenderer } from "echarts/renderers";
import {
  getIconForFile,
  // getIconForFolder,
  // getIconForOpenFolder,
} from "vscode-icons-js";
import { WINDOW_TREE_KEY } from "./constants";
import { TreeDataItem } from "./initConfig";

export interface ChartDataItem {
  name: string;
  size: string;
  desc: string;
  collapsed: boolean;
  children?: ChartDataItem[];
}

declare global {
  interface Window {
    [WINDOW_TREE_KEY]: Record<string, TreeDataItem>;
  }
}

const debounce = (
  fn: (...args: any) => any,
  delay: number
): ((...args: any) => any) => {
  let timer: number;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

echarts.use([TooltipComponent, TreeChart, SVGRenderer]);

const chartDom = document.getElementById("container") as HTMLElement;
const myChart = echarts.init(chartDom);

const mapObjSource = window[WINDOW_TREE_KEY];

const transformToChartDataItem = (fileName: string, obj: TreeDataItem) => {
  const res: ChartDataItem = {
    name: fileName,
    size: obj.size,
    collapsed: obj.collapsed,
    desc: obj.desc,
  };
  const children = obj.children;
  if (children) {
    res.children = Object.keys(children).map((fileName) => {
      const res = transformToChartDataItem(fileName, children[fileName]);
      return res;
    });
    // optimization
    if (res.children.length > 200) {
      res.collapsed = true;
    }
  }
  return res;
};

const transformedData: ChartDataItem = {
  name: "root",
  size: "0 B",
  desc: "", // root
  collapsed: false, // root default collapsed
  children: Object.keys(mapObjSource).map((fileName) => {
    const res = transformToChartDataItem(fileName, mapObjSource[fileName]);
    return res;
  }),
};

// myChart.showLoading();
// myChart.hideLoading();
// console.log("from-chart", process.env.NODE_ENV);
// console.log("from-chart", process.env);

// console.log("from-chart", __filename);
// console.log("from-chart", __dirname);
// console.log("from-chart", "production");
// console.log("from-chart", "src/chart.ts");
// console.log("from-chart", "src");

const getSvgUrl = (svgName: string) => {
  // return "image://./../src/static/icons/" + svgName;
  return "image://./node_modules/project-maps/dist/static/icons/" + svgName;
};

const option: EChartsOption = {
  tooltip: {
    trigger: "item",
    triggerOn: "mousemove",
    formatter: (obj: any) => {
      if (obj.data.children) {
        return `${obj.name}: ${obj.data.children.length} files`;
      } else {
        return `${obj.name}: ${obj.data.size}`;
      }
    },
  },
  series: [
    {
      type: "tree",
      data: [transformedData],
      left: "5%",
      top: "1%",
      right: "20%",
      bottom: "1%",
      symbol: ((val: number, params: any) => {
        if (!params.data.name) {
          return getSvgUrl("default_file.svg");
        } else if (params.data.children) {
          return getSvgUrl("default_folder.svg");
        } else {
          return getSvgUrl(getIconForFile(params.data.name) ?? "");
        }
      }) as unknown as string,
      symbolSize: 12,
      edgeShape: "curve",
      roam: true,
      initialTreeDepth: 2,
      height: "100%",
      label: {
        fontStyle: "normal",
        position: "left",
        verticalAlign: "middle",
        align: "right",
        fontSize: 12,
        formatter: (obj: any) => {
          if (obj.data.desc) {
            return `{a|${obj.name}} 
            {b|${obj.data.desc}}`;
          } else {
            return `{a|${obj.name}}`;
          }
        },
        rich: {
          a: {
            fontSize: 12,
            lineHeight: 12,
          },
          b: {
            color: "#999",
            height: 12,
            align: "left",
          },
        },
      },
      leaves: {
        label: {
          position: "right",
          verticalAlign: "middle",
          align: "left",
          formatter: (obj: any) => {
            if (obj.data.desc) {
              return `{a|${obj.name}}  {b|${obj.data.desc}}`;
            } else {
              return `{a|${obj.name}}`;
            }
          },
        },
      },
      lineStyle: {
        width: 1,
        curveness: 0.5,
      },
      // emphasis: {
      //   focus: "none",
      //   label: {
      //     formatter: (obj: any) => {
      //       // console.log(obj);
      //       return `${obj.name}: ${obj.data.size}`;
      //     },
      //   },
      // },
      expandAndCollapse: true,
      animationDuration: 550,
      animationDurationUpdate: 750,
    },
  ],
};

myChart.setOption(option);

const onResizeChart = debounce(myChart.resize, 300);
window.addEventListener("resize", onResizeChart);
