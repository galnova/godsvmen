export async function onRequest(context) {
  const { request, env } = context;

  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: cors });
  }

  if (request.method === 'GET') {
    const { results } = await env.DB.prepare(
      'SELECT character_slug, COUNT(*) as votes FROM character_votes GROUP BY character_slug ORDER BY votes DESC'
    ).all();
    return new Response(JSON.stringify(results), {
      headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }

  if (request.method === 'POST') {
    const { character_slug, voter_id } = await request.json();

    if (!character_slug || !voter_id) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }

    try {
      await env.DB.prepare(
        'INSERT INTO character_votes (character_slug, voter_id) VALUES (?, ?)'
      ).bind(character_slug, voter_id).run();

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    } catch {
      return new Response(JSON.stringify({ error: 'already_voted' }), {
        status: 409, headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }
  }

  if (request.method === 'DELETE') {
    const { voter_id } = await request.json();

    if (!voter_id) {
      return new Response(JSON.stringify({ error: 'missing_fields' }), {
        status: 400, headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }

    await env.DB.prepare(
      'DELETE FROM character_votes WHERE voter_id = ?'
    ).bind(voter_id).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...cors, 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405 });
}
