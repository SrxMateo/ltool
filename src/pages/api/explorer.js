import fs from 'fs/promises';
import path from 'path';

export async function GET({ request }) {
    const url = new URL(request.url);
    const targetPath = url.searchParams.get('path') || '/root/LumaXCorp';

    // Seguridad: Evitar salir de /root
    if (!targetPath.startsWith('/root')) {
        return new Response(JSON.stringify({ error: 'Acceso denegated' }), { status: 403 });
    }

    try {
        const stats = await fs.stat(targetPath);
        if (stats.isDirectory()) {
            const files = await fs.readdir(targetPath);
            const items = await Promise.all(files.map(async (file) => {
                const fullPath = path.join(targetPath, file);
                try {
                    const s = await fs.stat(fullPath);
                    return {
                        name: file,
                        path: fullPath,
                        isDir: s.isDirectory(),
                        size: s.size
                    };
                } catch (e) { return null; }
            }));
            return new Response(JSON.stringify(items.filter(i => i !== null)));
        } else {
            const content = await fs.readFile(targetPath, 'utf-8');
            return new Response(JSON.stringify({ content }));
        }
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
