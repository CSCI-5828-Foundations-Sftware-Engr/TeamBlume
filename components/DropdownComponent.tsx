import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function DropdownComponent({ddType,ddItems} : {ddType : string, ddItems : {key: string; name : string;}[]}) {

  type ddItemObj = {
    key?: string;
    name?: string;
  };
  
  const [selected, setSelected] = React.useState(new Set([ddItems[0].key]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  function handleSelected(e: string | Set<React.Key>){
    setSelected(e as Set<string>);
  }

  const cName = ddType + " drop-down-selection";
  const iId = ddType + "-value";
  const dId = ddType + "-dropdown-selector";

  return(
    <div className="dropdown-selector" id={dId}>
      <Dropdown>
        <Dropdown.Button className={cName} value={selectedValue}>{selectedValue}</Dropdown.Button>
        <Dropdown.Menu aria-label="Dynamic Actions" variant="solid" selectionMode="single" 
        items={ddItems} selectedKeys={selected} 
        onSelectionChange={(e) => {handleSelected(e)}}
        
        >
          {(item : ddItemObj) => (
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