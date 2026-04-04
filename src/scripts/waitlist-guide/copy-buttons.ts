const copyText = async (value: string) => {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API unavailable");
  }

  await navigator.clipboard.writeText(value);
};

const boot = () => {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-copy-value]");

  buttons.forEach((button) => {
    const defaultLabel = button.textContent ?? "Copy";

    button.addEventListener("click", async () => {
      const value = button.dataset.copyValue;

      if (!value) {
        return;
      }

      try {
        await copyText(value);
        button.textContent = "Copied";
      } catch (error) {
        console.error("[waitlist-guide] copy failed", error);
        button.textContent = "Copy failed";
      }

      window.setTimeout(() => {
        button.textContent = defaultLabel;
      }, 1800);
    });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}

export {};
