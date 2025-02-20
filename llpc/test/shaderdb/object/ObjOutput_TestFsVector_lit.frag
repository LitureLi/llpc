#version 450 core

layout(location = 0) in flat ivec3 i0;
layout(location = 1) in vec3 i1;

layout(location = 0) out ivec3 o0;
layout(location = 1) out vec3 o1;

void main()
{
    o0 = i0;
    o1 = i1;
}
// BEGIN_SHADERTEST
/*
; RUN: amdllpc -v %gfxip %s | FileCheck -check-prefix=SHADERTEST %s
; SHADERTEST-LABEL: {{^// LLPC}} SPIRV-to-LLVM translation results
; SHADERTEST-LABEL: {{^// LLPC}} SPIR-V lowering results
; SHADERTEST: call void @lgc.output.export.generic{{.*}}v3i32
; SHADERTEST: call void @lgc.output.export.generic{{.*}}v3f32
; SHADERTEST-LABEL: {{^// LLPC}} pipeline patching results
; SHADERTEST: [[value1:%[0-9]*]] = insertvalue { <3 x float>, <3 x float> } poison, <3 x float> {{%[0-9]*}}, 0
; SHADERTEST: [[value2:%[0-9]*]] = insertvalue { <3 x float>, <3 x float> } [[value1]], <3 x float> {{%[0-9]*}}, 1
; SHADERTEST: ret { <3 x float>, <3 x float> } [[value2]]
; SHADERTEST: AMDLLPC SUCCESS
*/
// END_SHADERTEST
