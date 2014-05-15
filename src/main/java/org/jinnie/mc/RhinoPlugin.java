package org.jinnie.mc;

import org.bukkit.Material;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.event.Listener;
import org.bukkit.plugin.java.JavaPlugin;

import javax.script.*;
import java.io.*;

/**
 * Created by jinnie on 4/27/14.
 */
public class RhinoPlugin extends JavaPlugin implements Listener {

    public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
        if (cmd.getName().equalsIgnoreCase("eval")) {
            try {
                StringBuilder builder = new StringBuilder();

                for (String s : args) {
                    builder.append(" ");
                    builder.append(s);
                }

                String jsCmd = builder.toString();

                ScriptEngine engine =
                        new ScriptEngineManager().getEngineByName("javascript");
                getLogger().info("Trying to run: " + jsCmd);
                Object result = engine.eval(jsCmd + ";'Command complete';", getCommonBindings(sender));
                sender.sendMessage((String) result);
            } catch (ScriptException e) {
                e.printStackTrace();
            }
            return true;
        } else if (cmd.getName().equalsIgnoreCase("load")) {
            try {
                File file = new File("program.js");
                if (!file.exists()) {
                    file.createNewFile();
                }
                Reader reader = new FileReader("program.js");

                ScriptEngine engine =
                        new ScriptEngineManager().getEngineByName("javascript");
                Bindings bindings = getCommonBindings(sender);
                if (args.length >= 1){
                    bindings.put("args", args);
                    getLogger().info("Trying to run js from file");
                    Object result = engine.eval(reader, bindings);
                    sender.sendMessage((String) result);
                } else {
                    sender.sendMessage("Usage /load figurename");
                }
            } catch (ScriptException e) {
                e.printStackTrace();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return false;
    }

    public Bindings getCommonBindings(CommandSender sender) {
        Bindings bindings = new SimpleBindings();
        bindings.put("player", sender);
        bindings.put("world", sender instanceof Player ? ((Player) sender).getWorld():null);
        bindings.put("location", sender instanceof Player ? ((Player) sender).getLocation():null);
        bindings.put("Material", Material.AIR);
        return bindings;
    }
}
