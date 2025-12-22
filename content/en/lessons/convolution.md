---
layout: lesson
title: 2D Convolution & Sliding Windows
description: Visualize how kernels move across images and compute output dimensions.
duration: 50 minutes
lang: en
objectives:
  - Explain how a convolution kernel slides to build spatial feature maps.
  - Compute output sizes for different padding and stride values.
  - Interpret how kernel coefficients amplify or suppress patterns.
agenda: |
  - Warm-up: recall 1D convolution intuition (5 min)
  - Mini-lesson: 2D sliding window walkthrough (15 min)
  - Guided practice: compute output sizes for varied kernels/strides (20 min)
  - Reflection: share one insight about padding or stride (10 min)
practice: |
  - **Formula drills:** Compute output height/width for different (H, W, K, P, S) tuples.
  - **Try a tweak:** Change the kernel values in the embedded deck (inspect element) and predict how outputs change.
  - **Whiteboard:** Sketch the receptive field for stride 2 vs stride 1 on a 6×6 input.
resources: |
  - Slides: [Conv2D sliding window demo](../slides/convolution/)
  - Reading: CS231n notes on convolution arithmetic
homework: |
  - Write the output size for three configurations: (H=7, W=7, K=3, P=1, S=2), (H=10, W=10, K=5, P=0, S=1), (H=5, W=5, K=3, P=1, S=1).
  - Describe in 3 sentences what padding changes in the visualization compared to stride.
---

<section class="card">
  <p class="badge">Demo</p>
  <h2>Conv2D Sliding Window</h2>
  <p>Space toggles the animation and the arrow keys move through the deck. Watch how the active 3×3 receptive field multiplies with the kernel and updates the 3×3 output.</p>
  <div style="margin-top: 1rem; border: 1px solid var(--border-color, #2f2f3a); border-radius: 12px; overflow: hidden; height: 520px;">
    <iframe src="{{ site.baseurl }}/assets/slides/Conv2DSimpleDemo/index.html" style="width:100%; height:100%; border:0;" title="Conv2D Sliding Window Demo" allowfullscreen></iframe>
  </div>
</section>

<section class="card">
  <p class="badge">Output Size</p>
  <h2>Convolution arithmetic</h2>
  <p>For input height/width <strong>H</strong> and <strong>W</strong>, kernel size <strong>K</strong> (square), padding <strong>P</strong>, and stride <strong>S</strong>:</p>
  <p class="formula">H<sub>out</sub> = \(\left\lfloor \frac{H - K + 2P}{S} \right\rfloor + 1\), &nbsp; W<sub>out</sub> = \(\left\lfloor \frac{W - K + 2P}{S} \right\rfloor + 1\)</p>
  <ul>
    <li><strong>Padding</strong> keeps border pixels in play by adding zeros around the input.</li>
    <li><strong>Stride</strong> controls how far the window jumps; larger strides shrink the output.</li>
    <li>The demo uses H = W = 5, K = 3, P = 0, S = 1, which gives a 3 × 3 output.</li>
  </ul>
</section>
