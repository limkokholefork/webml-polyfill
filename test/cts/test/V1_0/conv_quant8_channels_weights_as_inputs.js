// Generated file (from: conv_quant8_channels_weights_as_inputs.mod.py). Do not edit
describe('CTS', function() {
  const assert = chai.assert;
  const nn = navigator.ml.getNeuralNetworkContext();

  it('check result for Conv quant8 channels weights as inputs example', async function() {
    // For 'Conv quant8 channels weights as inputs' example: examples
    let model = await nn.createModel(options);
    let operandIndex = 0;

    let op1_value = [10, 10, 10];
    let op2_value = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let op3_value = [0, 0, 0];
    let op4_expect = [15, 38, 60];

    let type0 = {type: nn.TENSOR_QUANT8_ASYMM, dimensions: [1, 1, 1, 3], scale: 0.5, zeroPoint: 0};
    let type0_length = product(type0.dimensions);
    let type1 = {type: nn.TENSOR_QUANT8_ASYMM, dimensions: [3, 1, 1, 3], scale: 0.5, zeroPoint: 0};
    let type1_length = product(type1.dimensions);
    let type2 = {type: nn.TENSOR_INT32, dimensions: [3], scale: 0.25, zeroPoint: 0};
    let type2_length = product(type2.dimensions);
    let type3 = {type: nn.INT32};
    let type4 = {type: nn.TENSOR_QUANT8_ASYMM, dimensions: [1, 1, 1, 3], scale: 1.0, zeroPoint: 0};
    let type4_length = product(type4.dimensions);

    let op1 = operandIndex++;
    model.addOperand(type0);
    let op2 = operandIndex++;
    model.addOperand(type1);
    let op3 = operandIndex++;
    model.addOperand(type2);
    let pad0 = operandIndex++;
    model.addOperand(type3);
    let stride = operandIndex++;
    model.addOperand(type3);
    let act = operandIndex++;
    model.addOperand(type3);
    let op4 = operandIndex++;
    model.addOperand(type4);

    model.setOperandValue(op2, new Uint8Array(op2_value));
    model.setOperandValue(op3, new Int32Array(op3_value));

    model.setOperandValue(pad0, new Int32Array([0]));
    model.setOperandValue(stride, new Int32Array([1]));
    model.setOperandValue(act, new Int32Array([0]));
    model.addOperation(nn.CONV_2D, [op1, op2, op3, pad0, pad0, pad0, pad0, stride, stride, act], [op4]);

    model.identifyInputsAndOutputs([op1], [op4]);
    await model.finish();

    let compilation = await model.createCompilation();
    compilation.setPreference(getPreferenceCode(options.prefer));
    await compilation.finish();

    let execution = await compilation.createExecution();

    let op1_input = new Uint8Array(op1_value);
    execution.setInput(0, op1_input);
    let op4_output = new Uint8Array(type4_length);
    execution.setOutput(0, op4_output);

    await execution.startCompute();

    for (let i = 0; i < type4_length; ++i) {
      assert.isTrue(almostEqualCTSQuant8(op4_output[i], op4_expect[i]));
    }
  });
});
