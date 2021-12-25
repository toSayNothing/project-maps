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
  collapsed: false, // 根目录默认不折叠
  children: Object.keys(mapObjSource).map((fileName) => {
    const res = transformToChartDataItem(fileName, mapObjSource[fileName]);
    return res;
  }),
};

// myChart.showLoading();
// myChart.hideLoading();
console.log("from-chart", process.env.NODE_ENV);
console.log("from-chart", __filename);
console.log("from-chart", __dirname);
console.log("from-chart", "production");
console.log("from-chart", "src/chart.ts");
console.log("from-chart", "src");

const getSvgUrl = (svgName: string) => {
  // image://./static/icons/
  return "image://../src/static/icons/" + svgName;
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
      left: "5%", // 离左边的距离
      top: "1%", // 离=上边的距离
      right: "20%", // 离右边的距离
      bottom: "1%", // 离底下的距离
      // symbol: "circle", // 节点 的圆点
      // symbol: "image://./static/icons/default_file.svg",
      // symbol 根据文档有这个类型,但是types里没有,所以这里强行as string
      // (value: Array|number, params: Object) => string
      symbol: ((val: number, params: any) => {
        // console.log(getIconForFile("main.cpp"));
        if (!params.data.name) {
          // 这种情况只有两个 ,一个是root,一个是root的父
          // console.log("val", val, params);
          // return "image://./static/icons/" + "default_file.svg";
          return getSvgUrl("default_file.svg");
        } else if (params.data.children) {
          // console.log("isFolder", params);
          // getIconForFolder
          // getIconForOpenFolder
          // TODO 展开的情况
          // console.log(
          //   "getIconForFolder(params.data.name)",
          //   getIconForFolder(params.data.name)
          // );
          // console.log(
          //   "params.data.collapsed",
          //   "image://./static/icons/" + params.data.collapsed
          //     ? getIconForFolder(params.data.name)
          //     : getIconForOpenFolder(params.data.name)
          // );
          // const folderSvg = params.data.collapsed
          //   ? getIconForFolder(params.data.name)
          //   : getIconForOpenFolder(params.data.name);
          // const folderSvg = getIconForFolder(params.data.name);
          // return "image://./static/icons/" + "default_folder.svg";
          return getSvgUrl("default_folder.svg");
        } else {
          // return "image://./static/icons/" + getIconForFile(params.data.name);
          return getSvgUrl(getIconForFile(params.data.name) ?? "");
        }
        // file_type_cpp.svg
        // params.data.name
        // return "image://./static/icons/default_file.svg";
      }) as unknown as string,
      symbolSize: 12, // 节点的圆点的大小
      edgeShape: "curve", // curve polyline 折线类型是圆滑的还是方正的
      roam: true, // 是否开启鼠标缩放和平移,scale/move,true为都开启
      initialTreeDepth: 2, // 默认展开多少层
      height: "100%",
      label: {
        fontStyle: "normal",
        position: "left",
        verticalAlign: "middle",
        align: "right",
        fontSize: 12,
        formatter: (obj: any) => {
          // console.log(obj);
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
            // console.log(obj);
            if (obj.data.desc) {
              return `{a|${obj.name}}  {b|${obj.data.desc}}`;
            } else {
              return `{a|${obj.name}}`;
            }
          },
        },
      },
      lineStyle: {
        // color: "blue",
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
