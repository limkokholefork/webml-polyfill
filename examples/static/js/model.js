function getModelName(modelname) {
  return modelname.replace('_tflite', '').replace('_onnx', '')
      .replace('_openvino', '').replace(/_/g, ' ');
}

function isTFLite(modelname){
  return (modelname.toLowerCase().indexOf('_tflite') > -1)? true:false;
}

function isONNX(modelname){
  return (modelname.toLowerCase().indexOf('_onnx') > -1)? true:false;
}

function showModel(div, modelcategory) {
  let rowstring, row;
  modelcategory.map(model => {
    row = '<tr>';
    let name = '<td scope=\'col\' class=\'name\'>' + getModelName(model.modelId) + '</td>';
    row += name;

    let modeltype = `<td scope='col' class='format'>${model.format || '-'}</td>`;
    row += modeltype;

    let size = `<td scope='col' class='size'>${model.modelSize}</td>`;
    row += size;

    if (model.paperUrl) {
      row += `<td scope='col' class='paper'><a title='View paper' href='${model.paperUrl}'>paper</a></td>`;
    } else {
      row += `<td scope='col'></td>`;
    }

    let modelUrl = new URL(model.modelFile.replace('../', '../examples/'), location.href);
    let netronUrl = `https://intel.github.io/webml-polyfill/netron/?url=${modelUrl}`;
    if(netronUrl.indexOf('.bin') >-1) {
      netronUrl = netronUrl.replace('.bin', '.xml')
    }
    row += `<td scope='col' class='netron'><a title='View visualized model by Netron' href='${netronUrl}'>netron</a></td>`;

    if (model.intro) {
      row += `<td scope='col' class='des'>${model.intro}</td>`;
    } else {
      row += `<td scope='col'></td>`;
    }

    row = row + '</tr>';
    rowstring += row;
  });

  $(div).html(rowstring);
}

$(document).ready(function () {
  showModel('#modelcv-ic tbody', imageClassificationModels)
  showModel('#modelcv-od tbody', objectDetectionModels)
  showModel('#modelcv-sd tbody', humanPoseEstimationModels)
  showModel('#modelcv-ss tbody', semanticSegmentationModels)
  showModel('#modelcv-sr tbody', superResolutionModels)
  showModel('#modelcv-odf tbody', faceDetectionModels)
  showModel('#modelcv-fld tbody', facialLandmarkDetectionModels)
  showModel('#modelcv-st tbody', styleTransferModels)
  showModel('#modelcv-ea tbody', emotionAnalysisModels)
  showModel('#modelcv-fr tbody', faceRecognitionModels)
  showModel('#modelnoncv-sc tbody', speechCommandModels)
  showModel('#modelnoncv-sr tbody', speechRecognitionModels)
});
