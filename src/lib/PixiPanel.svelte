<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { Application, Assets, Container, Sprite, Texture } from "pixi.js";
  import { initDevtools } from "@pixi/devtools";
  import { svelteLogoUrl } from "./svelteLogoUrl";
  let pixiContainer: HTMLDivElement;
  let app: Application | null = null;

  onMount(() => {
    let destroyed = false;
    (async () => {
      app = new Application();
      await app.init({ background: "#1099bb", resizeTo: window });
      // Initialize PixiJS DevTools
      initDevtools({ app });
      if (!pixiContainer || destroyed) return;
      pixiContainer.appendChild(app.canvas);

      // Remove old bunny grid, add 10 bouncing, spinning Svelte logos
      const logoTexture = (await Assets.load(svelteLogoUrl)) as Texture;
      const logos: Sprite[] = [];
      const velocities: { vx: number; vy: number; vr: number }[] = [];
      const size = 48;
      for (let i = 0; i < 10; i++) {
        const sprite = new Sprite(logoTexture);
        sprite.width = size;
        sprite.height = size;
        // Random position, not overlapping edges
        sprite.x = Math.random() * (app.screen.width - size);
        sprite.y = Math.random() * (app.screen.height - size);
        // Random velocity and rotation speed
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 2;
        velocities.push({
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          vr: (Math.random() - 0.5) * 0.1,
        });
        sprite.anchor.set(0.5);
        app.stage.addChild(sprite);
        logos.push(sprite);
      }
      // Bounce off walls and each other
      app.ticker.add(() => {
        if (!app) return;
        for (let i = 0; i < logos.length; i++) {
          const s = logos[i];
          const v = velocities[i];
          s.x += v.vx;
          s.y += v.vy;
          s.rotation += v.vr;
          // Bounce off walls
          if (s.x - size / 2 < 0) {
            s.x = size / 2;
            v.vx *= -1;
          }
          if (s.x + size / 2 > app.screen.width) {
            s.x = app.screen.width - size / 2;
            v.vx *= -1;
          }
          if (s.y - size / 2 < 0) {
            s.y = size / 2;
            v.vy *= -1;
          }
          if (s.y + size / 2 > app.screen.height) {
            s.y = app.screen.height - size / 2;
            v.vy *= -1;
          }
        }
        // Bounce off each other
        for (let i = 0; i < logos.length; i++) {
          for (let j = i + 1; j < logos.length; j++) {
            const a = logos[i],
              b = logos[j];
            const dx = a.x - b.x,
              dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < size) {
              // Simple elastic collision
              const angle = Math.atan2(dy, dx);
              const targetX = b.x + Math.cos(angle) * size;
              const targetY = b.y + Math.sin(angle) * size;
              const ax = (targetX - a.x) * 0.5;
              const ay = (targetY - a.y) * 0.5;
              velocities[i].vx -= ax;
              velocities[i].vy -= ay;
              velocities[j].vx += ax;
              velocities[j].vy += ay;
            }
          }
        }
      });
    })();
    onDestroy(() => {
      destroyed = true;
      if (app) {
        app.destroy(true, { children: true, texture: true });
        app = null;
      }
      if (pixiContainer) {
        pixiContainer.innerHTML = "";
      }
    });
  });
</script>

<div bind:this={pixiContainer} style="width:100%;height:100%;"></div>
