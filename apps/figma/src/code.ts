type PluginMessage = {
  type: "create-button";
};

type ButtonVariant =
  | "Primary"
  | "Secondary"
  | "Ghost"
  | "Destructive";

type ButtonSize = "Small" | "Medium" | "Large";

const BUTTON_VARIANTS: ButtonVariant[] = [
  "Primary",
  "Secondary",
  "Ghost",
  "Destructive",
];

const BUTTON_SIZES: ButtonSize[] = [
  "Small",
  "Medium",
  "Large",
];

const COLORS = {
  primary: {
    r: 0,
    g: 0,
    b: 0,
  },

  secondary: {
    r: 0.95,
    g: 0.95,
    b: 0.95,
  },

  destructive: {
    r: 0.8,
    g: 0.1,
    b: 0.1,
  },

  white: {
    r: 1,
    g: 1,
    b: 1,
  },

  text: {
    r: 0,
    g: 0,
    b: 0,
  },

  mutedText: {
    r: 0.45,
    g: 0.45,
    b: 0.45,
  },
};

figma.showUI(__html__, {
  width: 280,
  height: 180,
  title: "Design System",
  themeColors: true,
});

figma.ui.onmessage = async (message: PluginMessage) => {
  if (message.type === "create-button") {
    await createButton();

    figma.notify("Button component set added to canvas");
  }
};

async function createButton() {
  await figma.loadFontAsync({
    family: "Inter",
    style: "Medium",
  });

  const components: ComponentNode[] = [];

  /*
   * Create every Button variant.
   *
   * Figma uses the component names to determine
   * the variant properties when they are combined
   * into a component set.
   *
   * Example:
   *
   * Button / Variant=Primary, Size=Medium
   */

  for (const variant of BUTTON_VARIANTS) {
    for (const size of BUTTON_SIZES) {
      const component = await createButtonVariant(
        variant,
        size
      );

      components.push(component);
    }
  }

  /*
   * Combine the individual components into
   * one native Figma component set.
   */

  const componentSet = figma.combineAsVariants(
    components,
    figma.currentPage
  );

  componentSet.name = "Button";

  /*
   * Add component properties to the component set.
   *
   * VARIANT properties are generated from the
   * names of the components inside the set.
   */

  const loadingProperty = componentSet.addComponentProperty(
    "Loading",
    "BOOLEAN",
    false
  );

  const disabledProperty = componentSet.addComponentProperty(
    "Disabled",
    "BOOLEAN",
    false
  );

  const labelProperty = componentSet.addComponentProperty(
    "Label",
    "TEXT",
    "Continue"
  );

  /*
   * Connect the custom properties to the layers
   * inside every Button variant.
   */

  for (const component of components) {
    const label = component.findOne(
      (node) => node.name === "Label"
    );

    const loadingIndicator = component.findOne(
      (node) => node.name === "Loading Indicator"
    );

    const disabledOverlay = component.findOne(
      (node) => node.name === "Disabled Overlay"
    );

    if (label && label.type === "TEXT") {
      label.componentPropertyReferences = {
        characters: labelProperty,
      };
    }

    if (loadingIndicator) {
      loadingIndicator.componentPropertyReferences = {
        visible: loadingProperty,
      };
    }

    if (disabledOverlay) {
      disabledOverlay.componentPropertyReferences = {
        visible: disabledProperty,
      };
    }
  }

  /*
   * Arrange the component set neatly on the page.
   */

  componentSet.x = 100;
  componentSet.y = 100;

  /*
   * Select and zoom into the component set.
   */

  figma.currentPage.selection = [componentSet];

  figma.viewport.scrollAndZoomIntoView([
    componentSet,
  ]);
}

async function createButtonVariant(
  variant: ButtonVariant,
  size: ButtonSize
): Promise<ComponentNode> {
  const component = figma.createComponent();

  component.name = `Variant=${variant}, Size=${size}`;

  const dimensions = getButtonDimensions(size);

  component.resize(
    dimensions.width,
    dimensions.height
  );

  component.layoutMode = "HORIZONTAL";
  component.primaryAxisAlignItems = "CENTER";
  component.counterAxisAlignItems = "CENTER";

  component.paddingLeft = dimensions.paddingX;
  component.paddingRight = dimensions.paddingX;
  component.paddingTop = 0;
  component.paddingBottom = 0;

  component.itemSpacing = 8;

  component.cornerRadius = 8;

  /*
   * Apply variant-specific colors.
   */

  const colors = getVariantColors(variant);

  component.fills = [
    {
      type: "SOLID",
      color: colors.background,
    },
  ];

  /*
   * Add the button label.
   */

  const label = figma.createText();

  label.name = "Label";

  label.fontName = {
    family: "Inter",
    style: "Medium",
  };

  label.fontSize = dimensions.fontSize;

  label.characters = "Continue";

  label.fills = [
    {
      type: "SOLID",
      color: colors.text,
    },
  ];

  component.appendChild(label);

  /*
   * Add a loading indicator.
   *
   * It starts hidden and will be controlled
   * by the Loading Boolean property.
   */

  const loadingIndicator = figma.createText();

  loadingIndicator.name = "Loading Indicator";

  loadingIndicator.fontName = {
    family: "Inter",
    style: "Medium",
  };

  loadingIndicator.fontSize = dimensions.fontSize;

  loadingIndicator.characters = "•••";

  loadingIndicator.fills = [
    {
      type: "SOLID",
      color: colors.text,
    },
  ];

  loadingIndicator.visible = false;

  component.appendChild(loadingIndicator);

  /*
   * Add a disabled overlay.
   *
   * This is hidden by default and will become
   * visible when Disabled is turned on.
   */

  const disabledOverlay = figma.createRectangle();

  disabledOverlay.name = "Disabled Overlay";

  disabledOverlay.resize(
    dimensions.width,
    dimensions.height
  );

  disabledOverlay.fills = [
    {
      type: "SOLID",
      color: {
        r: 1,
        g: 1,
        b: 1,
      },
      opacity: 0.35,
    },
  ];

  disabledOverlay.cornerRadius = 8;

  disabledOverlay.visible = false;

  component.appendChild(disabledOverlay);

  /*
   * Store the component's design information
   * as plugin data.
   *
   * This will be useful later when we connect
   * the Figma plugin to our token package.
   */

  component.setPluginData(
    "design-system",
    "button"
  );

  component.setPluginData(
    "variant",
    variant
  );

  component.setPluginData(
    "size",
    size
  );

  return component;
}

function getButtonDimensions(size: ButtonSize) {
  switch (size) {
    case "Small":
      return {
        width: 96,
        height: 32,
        paddingX: 12,
        fontSize: 12,
      };

    case "Large":
      return {
        width: 144,
        height: 48,
        paddingX: 20,
        fontSize: 16,
      };

    case "Medium":
    default:
      return {
        width: 120,
        height: 40,
        paddingX: 16,
        fontSize: 14,
      };
  }
}

function getVariantColors(
  variant: ButtonVariant
) {
  switch (variant) {
    case "Secondary":
      return {
        background: COLORS.secondary,
        text: COLORS.text,
      };

    case "Ghost":
      return {
        background: {
          r: 1,
          g: 1,
          b: 1,
        },
        text: COLORS.text,
      };

    case "Destructive":
      return {
        background: COLORS.destructive,
        text: COLORS.white,
      };

    case "Primary":
    default:
      return {
        background: COLORS.primary,
        text: COLORS.white,
      };
  }
}