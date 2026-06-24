import { useState, useEffect } from 'react'

// ── Tutorial docs ──
const tutorials = import.meta.glob('../data/docs/tutorials/*.md', { query: '?raw', import: 'default' })
// ── API docs (nested) ──
const apiDocs = import.meta.glob('../data/docs/api/**/*.md', { query: '?raw', import: 'default' })

const allDocs = { ...tutorials, ...apiDocs }

// ── Document index ──
const docMeta = [
  {
    category: 'tutorials',
    label: '开发教程',
    docs: [
      { slug: 'hello-world', title: '快速开始 (Hello World)', sidebar_label: '快速开始' },
      { slug: 'introduction', title: '基本概念', sidebar_label: '基本概念' },
      { slug: 'architecture', title: '架构概览', sidebar_label: '架构概览' },
      { slug: 'async-call', title: '异步调用方式', sidebar_label: '异步调用' },
      { slug: 'event', title: '事件系统', sidebar_label: '事件系统' },
      { slug: 'coordinates', title: '坐标系与坐标转换', sidebar_label: '坐标系' },
      { slug: 'color', title: '颜色与 Color 对象', sidebar_label: '颜色系统' },
      { slug: 'camera', title: '相机控制教程', sidebar_label: '相机控制' },
      { slug: 'frame-tick', title: '帧同步与 FrameTick', sidebar_label: '帧循环' },
      { slug: 'resources', title: '资源描述与引用', sidebar_label: '资源管理' },
      { slug: 'recipes', title: '实战配方', sidebar_label: '实战配方' },
      { slug: 'auth', title: '高级接口授权', sidebar_label: '接口授权' },
      { slug: 'typescript', title: 'TypeScript 类型支持', sidebar_label: 'TypeScript' },
      { slug: 'framework-integration', title: '框架集成指南', sidebar_label: '框架集成' },
      { slug: 'multi-video', title: '多视频同屏渲染', sidebar_label: '多视频' },
      { slug: 'performance', title: '性能最佳实践', sidebar_label: '性能优化' },
      { slug: 'cloud-deploy', title: '云端部署说明', sidebar_label: '云端部署' },
      { slug: 'explorer', title: 'DTS Explorer 桌面端', sidebar_label: 'Explorer' },
      { slug: 'explorer-guideline', title: 'Explorer 使用指南', sidebar_label: 'Explorer 指南' },
      { slug: 'faq', title: '常见问题 FAQ', sidebar_label: 'FAQ' },
      { slug: 'troubleshooting', title: '排错与常见报错', sidebar_label: '排错指南' },
      { slug: 'revision-history', title: '版本更新记录', sidebar_label: '更新记录' },
    ],
  },
  {
    category: 'api',
    label: 'API 文档',
    groups: [
      {
        label: '快速开始',
        docs: [
          { slug: 'quickstart/digital-twin-api', title: 'DigitalTwinAPI', sidebar_label: 'DigitalTwinAPI' },
          { slug: 'quickstart/digital-twin-player', title: 'DigitalTwinPlayer', sidebar_label: 'DigitalTwinPlayer' },
        ],
      },
      {
        label: '相机操作',
        docs: [
          { slug: 'camera/camera', title: 'Camera', sidebar_label: 'Camera' },
          { slug: 'camera/camera-tour', title: 'CameraTour', sidebar_label: 'CameraTour' },
          { slug: 'camera/camera-tour-data', title: 'CameraTourData', sidebar_label: 'CameraTourData' },
          { slug: 'camera/camera-tour-key-frame', title: 'CameraTourKeyFrame', sidebar_label: 'CameraTourKeyFrame' },
        ],
      },
      {
        label: '图层操作',
        docs: [
          { slug: 'layer/info-tree', title: 'InfoTree', sidebar_label: 'InfoTree' },
          { slug: 'layer/tile-layer', title: 'TileLayer', sidebar_label: 'TileLayer' },
          { slug: 'layer/shape-file-layer', title: 'ShapeFileLayer', sidebar_label: 'ShapeFileLayer' },
          { slug: 'layer/geo-json-layer', title: 'GeoJSONLayer', sidebar_label: 'GeoJSONLayer' },
          { slug: 'layer/cesium3dtileset', title: 'Cesium3DTileset', sidebar_label: 'Cesium3DTileset' },
          { slug: 'layer/imagery-layer', title: 'ImageryLayer', sidebar_label: 'ImageryLayer' },
          { slug: 'layer/imagery-layer-2', title: 'ImageryLayer2', sidebar_label: 'ImageryLayer2' },
          { slug: 'layer/marker-layer', title: 'MarkerLayer', sidebar_label: 'MarkerLayer' },
          { slug: 'layer/globe-terrain', title: 'GlobeTerrain', sidebar_label: 'GlobeTerrain' },
          { slug: 'layer/da-hua-video-fusion', title: 'DaHuaVideoFusion', sidebar_label: 'DaHuaVideoFusion' },
        ],
      },
      {
        label: '场景标记',
        docs: [
          { slug: 'marker/marker', title: 'Marker', sidebar_label: 'Marker' },
          { slug: 'marker/custom-tag', title: 'CustomTag', sidebar_label: 'CustomTag' },
          { slug: 'marker/marker3d', title: 'Marker3D', sidebar_label: 'Marker3D' },
        ],
      },
      {
        label: '矢量图形',
        docs: [
          { slug: 'vector/polyline', title: 'Polyline', sidebar_label: 'Polyline' },
          { slug: 'vector/polygon', title: 'Polygon', sidebar_label: 'Polygon' },
          { slug: 'vector/polygon3d', title: 'Polygon3D', sidebar_label: 'Polygon3D' },
          { slug: 'vector/odline', title: 'ODLine', sidebar_label: 'ODLine' },
          { slug: 'vector/topology-line', title: 'TopologyLine', sidebar_label: 'TopologyLine' },
          { slug: 'vector/spline-mesh', title: 'SplineMesh', sidebar_label: 'SplineMesh' },
          { slug: 'vector/guide-line', title: 'GuideLine', sidebar_label: 'GuideLine' },
          { slug: 'vector/tag', title: 'Tag', sidebar_label: 'Tag' },
          { slug: 'vector/vector-field', title: 'VectorField', sidebar_label: 'VectorField' },
        ],
      },
      {
        label: '覆盖物',
        docs: [
          { slug: 'overlay/heatmap', title: 'HeatMap', sidebar_label: 'HeatMap' },
          { slug: 'overlay/heatmap3d', title: 'HeatMap3D', sidebar_label: 'HeatMap3D' },
          { slug: 'overlay/decal', title: 'Decal', sidebar_label: 'Decal' },
          { slug: 'overlay/highlight-area', title: 'HighlightArea', sidebar_label: 'HighlightArea' },
          { slug: 'overlay/video-projection', title: 'VideoProjection', sidebar_label: 'VideoProjection' },
          { slug: 'overlay/panorama', title: 'Panorama', sidebar_label: 'Panorama' },
          { slug: 'overlay/light', title: 'Light', sidebar_label: 'Light' },
          { slug: 'overlay/radiation-point', title: 'RadiationPoint', sidebar_label: 'RadiationPoint' },
        ],
      },
      {
        label: '水文仿真',
        docs: [
          { slug: 'hydro/dynamic-water', title: 'DynamicWater', sidebar_label: 'DynamicWater' },
          { slug: 'hydro/flood-fill', title: 'FloodFill', sidebar_label: 'FloodFill' },
          { slug: 'hydro/water-flow-field', title: 'WaterFlowField', sidebar_label: 'WaterFlowField' },
          { slug: 'hydro/water-mesh', title: 'WaterMesh', sidebar_label: 'WaterMesh' },
          { slug: 'hydro/hydrodynamic1d', title: 'HydroDynamic1D', sidebar_label: 'HydroDynamic1D' },
          { slug: 'hydro/hydrodynamic2d', title: 'HydroDynamic2D', sidebar_label: 'HydroDynamic2D' },
          { slug: 'hydro/hydrodynamic-model', title: 'HydrodynamicModel', sidebar_label: 'HydrodynamicModel' },
          { slug: 'hydro/hydrodynamic-model-2', title: 'HydrodynamicModel2', sidebar_label: 'HydrodynamicModel2' },
          { slug: 'hydro/smoothed-particle-hydrodynamics', title: 'SPH', sidebar_label: 'SPH' },
          { slug: 'hydro/river', title: 'River', sidebar_label: 'River' },
          { slug: 'hydro/fluid', title: 'Fluid', sidebar_label: 'Fluid' },
        ],
      },
      {
        label: '交通仿真',
        docs: [
          { slug: 'traffic/vehicle', title: 'Vehicle', sidebar_label: 'Vehicle' },
          { slug: 'traffic/vehicle-2', title: 'Vehicle2', sidebar_label: 'Vehicle2' },
          { slug: 'traffic/train', title: 'Train', sidebar_label: 'Train' },
          { slug: 'traffic/drone', title: 'Drone', sidebar_label: 'Drone' },
          { slug: 'traffic/satellite', title: 'Satellite', sidebar_label: 'Satellite' },
          { slug: 'traffic/traffic-simulation', title: 'TrafficSimulation', sidebar_label: 'TrafficSimulation' },
          { slug: 'traffic/box-trigger', title: 'BoxTrigger', sidebar_label: 'BoxTrigger' },
        ],
      },
      {
        label: '信号仿真',
        docs: [
          { slug: 'signal/antenna', title: 'Antenna', sidebar_label: 'Antenna' },
          { slug: 'signal/signal-wave', title: 'SignalWave', sidebar_label: 'SignalWave' },
          { slug: 'signal/beam', title: 'Beam', sidebar_label: 'Beam' },
        ],
      },
      {
        label: '海洋仿真',
        docs: [
          { slug: 'ocean/ocean-heatmap', title: 'OceanHeatMap', sidebar_label: 'OceanHeatMap' },
          { slug: 'ocean/coastline', title: 'Coastline', sidebar_label: 'Coastline' },
        ],
      },
      {
        label: '战场仿真',
        docs: [
          { slug: 'battle/plot', title: 'Plot', sidebar_label: 'Plot' },
          { slug: 'battle/battlefield-simulation', title: 'BattlefieldSimulation', sidebar_label: 'BattlefieldSimulation' },
        ],
      },
      {
        label: '有限元仿真',
        docs: [
          { slug: 'fem/finite-element', title: 'FiniteElement', sidebar_label: 'FiniteElement' },
          { slug: 'fem/finite-element-2', title: 'FiniteElement2', sidebar_label: 'FiniteElement2' },
        ],
      },
      {
        label: '绘制助手',
        docs: [
          { slug: 'measure/plot', title: 'Plot', sidebar_label: 'Plot' },
          { slug: 'measure/edit-helper', title: 'EditHelper', sidebar_label: 'EditHelper' },
        ],
      },
      {
        label: '分析工具',
        docs: [
          { slug: 'analysis/tools', title: 'Tools', sidebar_label: 'Tools' },
          { slug: 'analysis/excavation-analysis', title: 'ExcavationAnalysis', sidebar_label: 'ExcavationAnalysis' },
          { slug: 'analysis/query-option', title: 'QueryOption', sidebar_label: 'QueryOption' },
        ],
      },
      {
        label: '模型操作',
        docs: [
          { slug: 'model/custom-mesh', title: 'CustomMesh', sidebar_label: 'CustomMesh' },
          { slug: 'model/custom-object', title: 'CustomObject', sidebar_label: 'CustomObject' },
          { slug: 'model/gaussian-splatting', title: 'GaussianSplatting', sidebar_label: 'GaussianSplatting' },
        ],
      },
      {
        label: '环境天气',
        docs: [
          { slug: 'weather/weather', title: 'Weather', sidebar_label: 'Weather' },
          { slug: 'weather/misc', title: 'Misc', sidebar_label: 'Misc' },
          { slug: 'weather/settings', title: 'Settings', sidebar_label: 'Settings' },
        ],
      },
      {
        label: '系统设置',
        docs: [
          { slug: 'settings/settings', title: 'Settings', sidebar_label: 'Settings' },
          { slug: 'settings/settings-panel', title: 'SettingsPanel', sidebar_label: 'SettingsPanel' },
        ],
      },
      {
        label: '辅助工具',
        docs: [
          { slug: 'utils/coord', title: 'Coord', sidebar_label: 'Coord' },
          { slug: 'utils/fd-external', title: 'FdExternal', sidebar_label: 'FdExternal' },
        ],
      },
      {
        label: '事件系统',
        docs: [
          { slug: 'events/edit-helper', title: 'EditHelper', sidebar_label: 'EditHelper' },
          { slug: 'events/tools', title: 'Tools', sidebar_label: 'Tools' },
          { slug: 'events/camera-tour', title: 'CameraTour', sidebar_label: 'CameraTour' },
        ],
      },
    ],
  },
]

function resolveDocPath(category, slug) {
  if (category === 'tutorials') {
    return `../data/docs/tutorials/${slug}.md`
  }
  return `../data/docs/api/${slug}.md`
}

export function useDoc(category, slug) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const path = resolveDocPath(category, slug)
    const loader = allDocs[path]

    if (loader) {
      loader().then((raw) => {
        const stripped = raw.replace(/^---[\s\S]*?---\n*/, '')
        setContent(stripped)
        setLoading(false)
      }).catch(() => {
        setError('文档加载失败')
        setLoading(false)
      })
    } else {
      setError('文档未找到')
      setLoading(false)
    }
  }, [category, slug])

  return { content, loading, error }
}

export function useDocTitle(category, slug) {
  if (category === 'tutorials') {
    const group = docMeta.find((g) => g.category === 'tutorials')
    return group?.docs.find((d) => d.slug === slug) || null
  }
  if (category === 'api') {
    const group = docMeta.find((g) => g.category === 'api')
    for (const g of group?.groups || []) {
      const doc = g.docs.find((d) => d.slug === slug)
      if (doc) return doc
    }
  }
  return null
}

export { docMeta }
