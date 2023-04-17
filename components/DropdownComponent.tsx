import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function DropdownComponent({ddType,ddItems} : {ddType : string, ddItems : {key: string; name : string;}[]}) {

    const [selected, setSelected] = React.useState(new Set([ddItems[0].key] || "Select an option"));

    const selectedValue = React.useMemo(
      () => Array.from(selected).join(", ").replaceAll("_", " "),
      [selected]
    );

    const cName = ddType + " drop-down-selection";
    const iId = ddType + "-value";

    return(
      <div className="dropdown-selector" id="dropdown-selector">
        <Dropdown>
          <Dropdown.Button className={cName} value={selectedValue}>{selectedValue}</Dropdown.Button>
          <Dropdown.Menu aria-label="Dynamic Actions" variant="solid" selectionMode="single" 
          items={ddItems} selectedKeys={selected} onSelectionChange={setSelected}
          >
            {(item) => (
              <Dropdown.Item key={item.key}>
                {item.name}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <input type="hidden" id={iId} value={selectedValue} />
      </div>
    );
}